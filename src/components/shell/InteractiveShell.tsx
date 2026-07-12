import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import styled from '@emotion/styled';

const ShellBox = styled.div`
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.28);
`;

const Output = styled.div`
  min-height: 190px;
  max-height: 320px;
  overflow-y: auto;
  padding: 16px;
  color: ${({ theme }) => theme.colors.text};
  font-size: .86rem;
  line-height: 1.65;
  white-space: pre-wrap;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  span { color: ${({ theme }) => theme.colors.primary}; }

  input {
    min-width: 0;
    flex: 1;
    border: 0;
    outline: 0;
    color: ${({ theme }) => theme.colors.primarySoft};
    background: transparent;
  }
`;

const commands: Record<string, string> = {
  help: 'Available commands: help, whoami, skills, contact, clear',
  whoami: 'Filippo Giacchè — Senior Full Stack Developer based in Italy.',
  skills: 'React · TypeScript · Redux · Emotion · PHP · Symfony · WebRTC · SIP · Linux · Docker · Nginx · Go',
  contact: 'GitHub: github.com/giacco\nLinkedIn: linkedin.com/in/filippo-giacchè',
};

export function InteractiveShell() {
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Portfolio shell v0.1',
    "Type 'help' to list available commands.",
  ]);

  const output = useMemo(() => history.join('\n\n'), [history]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const command = value.trim().toLowerCase();

    if (!command) return;
    setValue('');

    if (command === 'clear') {
      setHistory([]);
      return;
    }

    const response = commands[command] ?? `Command not found: ${command}`;
    setHistory((current) => [...current, `$ ${command}`, response]);
  }

  return (
    <ShellBox>
      <Output aria-live="polite">{output}</Output>
      <Form onSubmit={submit}>
        <span>$</span>
        <input
          aria-label="Shell command"
          autoComplete="off"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="help"
        />
      </Form>
    </ShellBox>
  );
}
