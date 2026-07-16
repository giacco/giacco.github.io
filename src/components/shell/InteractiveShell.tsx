import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import styled from '@emotion/styled';

const ShellBox = styled.div`
  width: 100%;
  min-width: 0;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.28);
`;

const Output = styled.div`
  min-width: 0;
  min-height: 230px;
  max-height: 380px;
  overflow-y: auto;
  padding: 16px;
  color: ${({ theme }) => theme.colors.text};
  font-size: .86rem;
  line-height: 1.65;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  scroll-behavior: smooth;
`;

const Form = styled.form`
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  span {
    flex: 0 0 auto;
    max-width: 100%;
    color: ${({ theme }) => theme.colors.primary};
    overflow-wrap: anywhere;
  }

  input {
    width: 100%;
    min-width: 0;
    flex: 1;
    border: 0;
    outline: 0;
    color: ${({ theme }) => theme.colors.primarySoft};
    background: transparent;
    font: inherit;
  }

  @media (max-width: 560px) {
    align-items: stretch;
    flex-direction: column;
    gap: 6px;
    padding-inline: 12px;

    span,
    input {
      width: 100%;
    }
  }
`;

type Session = 'guest' | 'root' | 'asterisk';

const HELP = `Available commands

Profile
  whoami  about  skills  experience  timeline  stats  hire

Navigation
  ls  pwd  tree  cd <page>  cv  projects  blog

Work
  routeros  kalliope  jssip  libreoffice  opensource

Contact
  contact  github  linkedin  email

Documents
  resume  certificate  print  print cv

Terminal
  help  history  clear  matrix  coffee  sudo  sudo su  ssh pbx  exit  hack

Keyboard
  ↑ / ↓ command history · Tab autocomplete`;

const responses: Record<string, string> = {
  whoami: 'Filippo Giacchè — Full Stack Developer based in Umbria, Italy.',
  about: 'I build enterprise web applications and real-time communication platforms across frontend, backend, Linux and networking.',
  skills: 'React · TypeScript · JavaScript · Redux · Emotion · Vite · PHP · Symfony · REST · WebSocket · WebRTC · SIP · JsSIP · Linux · Docker · Nginx · Git · Go · SQL · CI/CD',
  experience: `2021 — present  Full Stack Developer · Kalliope
2017 — 2021     Full Stack Developer · MC System
2016 — 2017     LibreOffice contributor · University internship`,
  timeline: `2016  First accepted LibreOffice patch
2017  Joined MC System
2021  Joined Kalliope
2026  RouterOS rewrite in Go`,
  stats: `Experience      9+ years
Primary focus  Enterprise web apps and real-time communications
Open source    LibreOffice · JsSIP
Location       Italy
Remote         Yes`,
  hire: `STATUS    Available for selected remote opportunities
LOCATION  Italy
REMOTE    Yes
ROLE      Full Stack Developer
CONTACT   filippo.giacche@gmail.com`,
  pwd: '/home/guest/portfolio',
  ls: 'portfolio/  shell/  cv/  blog/  projects/  contact/',
  tree: `portfolio
├── cv
├── shell
├── blog
├── projects
│   ├── routeros
│   ├── kalliope
│   ├── jssip
│   └── libreoffice
└── contact`,
  routeros: `RouterOS · Go
REST API · WebSocket events · concurrent job queue · Linux deployment · planned CLI
Source: github.com/giacco/routeros`,
  kalliope: `Kalliope
Enterprise React/TypeScript communication platform with PHP/Symfony APIs, SIP over WebSocket, WebRTC media handling, Docker and Nginx deployments.`,
  jssip: `JsSIP
Open-source contribution and technical work around SIP/WebRTC, early media, DTMF, ICE negotiation and browser interoperability.`,
  libreoffice: `LibreOffice
Accepted patches contributed during a university internship. First-patch acknowledgement awarded by The Document Foundation in 2016.`,
  opensource: 'Open-source work: LibreOffice · JsSIP · personal RouterOS project in Go.',
  contact: `Email: filippo.giacche@gmail.com
GitHub: github.com/giacco
LinkedIn: linkedin.com/in/filippo-giacchè`,
  matrix: `Wake up, recruiter...
The portfolio has you.
Follow the green cursor.`,
  coffee: 'Brewing coffee... done. Productivity +10 ☕',
  sudo: 'Permission denied. This incident will be reported.',
  hack: 'Access granted: curiosity detected. No systems were harmed.',
};

const commandNames = [
  'help', 'whoami', 'about', 'skills', 'experience', 'timeline', 'stats', 'hire',
  'ls', 'pwd', 'tree', 'cv', 'projects', 'blog', 'routeros', 'kalliope', 'jssip',
  'libreoffice', 'opensource', 'contact', 'github', 'linkedin', 'email', 'resume',
  'certificate', 'print', 'print cv', 'history', 'clear', 'matrix', 'coffee', 'sudo',
  'sudo su', 'ssh pbx', 'exit', 'hack',
];

const routes: Record<string, string> = {
  portfolio: '/',
  home: '/',
  cv: '/cv',
  shell: '/shell',
  blog: '/blog',
  projects: '/projects',
};

const prompts: Record<Session, string> = {
  guest: 'guest@giacco:~/portfolio$',
  root: 'root@giacco:/home/guest/portfolio#',
  asterisk: 'root@asterisk:~#',
};

function navigate(route: string) {
  window.location.hash = route;
}

function openExternal(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function InteractiveShell() {
  const [value, setValue] = useState('');
  const [session, setSession] = useState<Session>('guest');
  const [history, setHistory] = useState<string[]>([
    'Portfolio shell v1.2',
    "Type 'help' to list available commands.",
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const outputRef = useRef<HTMLDivElement>(null);

  const output = useMemo(() => history.join('\n\n'), [history]);

  useEffect(() => {
    const element = outputRef.current;
    if (!element) return;
    element.scrollTop = element.scrollHeight;
  }, [history]);

  function append(command: string, response: string, prompt = prompts[session]) {
    setHistory((current) => [...current, `${prompt} ${command}`, response]);
  }

  function runCommand(rawCommand: string) {
    const command = rawCommand.trim().toLowerCase().replace(/\s+/g, ' ');
    if (!command) return;

    setCommandHistory((current) => [...current, command]);
    setHistoryIndex(-1);

    if (command === 'clear') {
      setHistory([]);
      return;
    }

    if (command === 'help') {
      append(command, HELP);
      return;
    }

    if (command === 'history') {
      append(command, commandHistory.length ? commandHistory.map((item, index) => `${index + 1}  ${item}`).join('\n') : 'No commands in history.');
      return;
    }

    if (/^sudo\s+rm\s+-(rf|fr)\s+\/$/.test(command)) {
      append(command, 'Nice try 😄');
      return;
    }

    if (command === 'sudo su' || command === 'sudo -i') {
      append(command, 'root shell opened');
      setSession('root');
      return;
    }

    if (command === 'ssh pbx' || command === 'ssh root@pbx') {
      append(command, `Connecting to pbx...
The authenticity of host 'pbx' has been established.
Welcome to Asterisk PBX
Last login: just now from portfolio.local`);
      setSession('asterisk');
      return;
    }

    if (command === 'exit') {
      if (session === 'asterisk') {
        append(command, 'Connection to pbx closed.');
        setSession('guest');
      } else if (session === 'root') {
        append(command, 'logout');
        setSession('guest');
      } else {
        append(command, 'There is no active remote session.');
      }
      return;
    }

    if (session === 'asterisk') {
      if (command === 'whoami') append(command, 'root');
      else if (command === 'hostname') append(command, 'asterisk');
      else if (command === 'pwd') append(command, '/root');
      else if (command === 'asterisk -rvvv') append(command, `Asterisk 18 connected to asterisk (pid = 1337)
asterisk*CLI>`);
      else if (command === 'core show version') append(command, 'Asterisk 18 portfolio simulation');
      else append(command, `bash: ${command}: command not found`);
      return;
    }

    if (command.startsWith('cd ')) {
      const destination = command.slice(3).replace(/^\.\//, '').replace(/\/$/, '');
      const route = routes[destination];
      if (!route) {
        append(command, `cd: ${destination}: No such page`);
        return;
      }
      append(command, `Navigating to /${destination === 'home' ? 'portfolio' : destination}...`);
      navigate(route);
      return;
    }

    if (routes[command]) {
      append(command, `Opening ${command}...`);
      navigate(routes[command]);
      return;
    }

    if (command === 'print' || command === 'print cv') {
      append(command, 'Preparing printable CV...\nLaunching print dialog...');
      navigate('/cv/print?print=1');
      return;
    }

    if (command === 'resume') {
      append(command, 'Opening CV PDF...');
      openExternal('/assets/cv/filippo-giacche-cv.pdf');
      return;
    }

    if (command === 'certificate') {
      append(command, 'Opening LibreOffice certificate...');
      openExternal('/assets/certificates/libreoffice.pdf');
      return;
    }

    if (command === 'github') {
      append(command, 'Opening GitHub...');
      openExternal('https://github.com/giacco');
      return;
    }

    if (command === 'linkedin') {
      append(command, 'Opening LinkedIn...');
      openExternal('https://www.linkedin.com/in/filippo-giacchè');
      return;
    }

    if (command === 'email') {
      append(command, 'Opening email client...');
      window.location.href = 'mailto:filippo.giacche@gmail.com';
      return;
    }

    const response = responses[command];
    append(command, response ?? `Command not found: ${command}\nType 'help' to see the available commands.`);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const command = value;
    setValue('');
    runCommand(command);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!commandHistory.length) return;
      const nextIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(nextIndex);
      setValue(commandHistory[commandHistory.length - 1 - nextIndex] ?? '');
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setValue('');
        return;
      }
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex);
      setValue(commandHistory[commandHistory.length - 1 - nextIndex] ?? '');
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      const prefix = value.trim().toLowerCase();
      if (!prefix) return;
      const matches = commandNames.filter((command) => command.startsWith(prefix));
      if (matches.length === 1) setValue(matches[0]);
      else if (matches.length > 1) append(prefix, matches.join('  '));
    }
  }

  return (
    <ShellBox>
      <Output ref={outputRef} aria-live="polite" aria-label="Shell output">{output}</Output>
      <Form onSubmit={submit}>
        <span aria-hidden="true">{prompts[session]}</span>
        <input
          aria-label="Shell command"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="help"
        />
      </Form>
    </ShellBox>
  );
}
