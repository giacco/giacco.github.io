import { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { HashRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { BootSequence } from './components/boot/BootSequence';
import { StatusBar } from './components/layout/StatusBar';
import { InteractiveShell } from './components/shell/InteractiveShell';
import { CvPage } from './pages/CvPage';

const Page = styled.main`
  width: 100%;
  max-width: 100%;
  min-width: 0;
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 32px 0 64px;
  box-sizing: border-box;
  @media (max-width: 680px) { width: min(100% - 20px, 1120px); padding-top: 12px; }
`;

const Terminal = styled.section`
  width: 100%;
  max-width: 100%;
  min-width: 0;
  min-height: calc(100vh - 96px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 18px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 0 60px ${({ theme }) => theme.colors.shadow};
  backdrop-filter: blur(18px);
  @media (max-width: 680px) { min-height: calc(100dvh - 24px); border-radius: 12px; }
`;

const Bar = styled.header`
  min-height: 52px;
  padding: 0 18px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(0, 0, 0, 0.32);
  @media (max-width: 680px) { min-height: 46px; padding: 0 12px; grid-template-columns: auto 1fr; }
`;

const Dots = styled.div`
  display: flex;
  gap: 7px;
  span { width: 9px; height: 9px; border-radius: 50%; background: ${({ theme }) => theme.colors.primary}; opacity: .45; }
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.muted};
  font-size: .78rem;
  text-align: center;
  @media (max-width: 680px) { text-align: right; font-size: .68rem; }
`;

const Navigation = styled.nav`
  display: flex;
  max-width: 100%;
  min-width: 0;
  gap: 8px;
  padding: 12px 18px;
  overflow-x: auto;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(0, 0, 0, 0.18);
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
  a { flex: 0 0 auto; min-height: 40px; display: inline-flex; align-items: center; padding: 0 13px; border: 1px solid transparent; border-radius: 7px; color: ${({ theme }) => theme.colors.muted}; text-decoration: none; font-size: .78rem; }
  a:hover, a:focus-visible, a.active { color: ${({ theme }) => theme.colors.primarySoft}; border-color: ${({ theme }) => theme.colors.border}; background: rgba(0,255,102,.06); outline: none; }
  @media (max-width: 680px) { padding: 9px 12px; }
`;

const Body = styled.div`
  max-width: 100%;
  min-width: 0;
  min-height: 520px;
  padding: clamp(22px, 5vw, 72px);
  display: grid;
  gap: 56px;
  @media (max-width: 680px) { min-height: 420px; padding: 22px 16px 34px; gap: 38px; }
`;

const Prompt = styled.p`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.primarySoft};
  font-size: clamp(.82rem, 2vw, 1rem);
`;

const HeroTitle = styled(motion.h1)`
  margin: 0;
  max-width: 900px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: clamp(2.25rem, 8vw, 6.2rem);
  line-height: .95;
  letter-spacing: -.07em;
  text-shadow: 0 0 24px ${({ theme }) => theme.colors.shadow};
  overflow-wrap: anywhere;
`;

const Role = styled.h2`
  margin: 22px 0 0;
  font-size: clamp(1rem, 3vw, 1.65rem);
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const Intro = styled.p`
  max-width: 780px;
  margin: 20px 0 0;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.75;
  font-size: clamp(.92rem, 2vw, 1.08rem);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  @media (max-width: 850px) { grid-template-columns: 1fr; }
`;

const Card = styled(motion.article)`
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background: rgba(0,0,0,.18);
  h3 { margin: 0 0 10px; color: ${({ theme }) => theme.colors.primary}; font-size: .95rem; }
  p { margin: 0; color: ${({ theme }) => theme.colors.muted}; line-height: 1.65; font-size: .88rem; }
`;

const Placeholder = styled.section`
  max-width: 760px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background: rgba(0,0,0,.18);
  h1 { margin: 0 0 14px; color: ${({ theme }) => theme.colors.primary}; }
  p { margin: 0; color: ${({ theme }) => theme.colors.muted}; line-height: 1.7; }
`;

const cards = [
  ['frontend.stack', 'React, TypeScript, Redux, Emotion, Vite and scalable SPA architecture.'],
  ['realtime.stack', 'WebRTC, SIP, JsSIP, WebSocket, ICE, STUN, TURN and VoIP troubleshooting.'],
  ['backend.ops', 'PHP, Symfony, REST APIs, Linux, Docker, Nginx, Go and automation.'],
];

function PortfolioPage() {
  return <>
    <section>
      <Prompt>$ whoami</Prompt>
      <HeroTitle initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>Filippo Giacchè</HeroTitle>
      <Role>Senior Full Stack Developer</Role>
      <Intro>I build enterprise web applications and real-time communication platforms, combining frontend engineering, backend development, Linux, networking and open-source contributions.</Intro>
    </section>
    <section>
      <Prompt>$ cat core-skills.txt</Prompt>
      <Grid>{cards.map(([title, body], index) => <Card key={title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }}><h3>{title}</h3><p>{body}</p></Card>)}</Grid>
    </section>
  </>;
}

function PlaceholderPage({ title, command, text }: { title: string; command: string; text: string }) {
  return <Placeholder><Prompt>$ {command}</Prompt><h1>{title}</h1><p>{text}</p></Placeholder>;
}

function shouldShowBoot() {
  return typeof window !== 'undefined' && sessionStorage.getItem('portfolio-booted') !== 'true';
}

export default function RoutedApp() {
  const [isBooting, setIsBooting] = useState(shouldShowBoot);
  const completeBoot = useCallback(() => { sessionStorage.setItem('portfolio-booted', 'true'); setIsBooting(false); }, []);

  return <HashRouter>
    {isBooting && <BootSequence onComplete={completeBoot} />}
    <Page><Terminal>
      <Bar><Dots><span /><span /><span /></Dots><Title>guest@giacco:~/portfolio</Title><div /></Bar>
      <Navigation aria-label="Portfolio pages">
        <NavLink to="/">./portfolio</NavLink><NavLink to="/shell">./shell</NavLink><NavLink to="/cv">./cv</NavLink><NavLink to="/blog">./blog</NavLink><NavLink to="/projects">./projects</NavLink>
      </Navigation>
      <Body><Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/shell" element={<><Prompt>$ ./portfolio-shell</Prompt><InteractiveShell /></>} />
        <Route path="/cv" element={<CvPage />} />
        <Route path="/blog" element={<PlaceholderPage title="Technical Blog" command="ls ./blog" text="Articles about React, TypeScript, WebRTC, SIP, Linux, networking and software architecture are coming next." />} />
        <Route path="/projects" element={<PlaceholderPage title="Projects" command="ls ./projects" text="RouterOS in Go, Kalliope, JsSIP contributions and selected engineering work will be presented here." />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes></Body>
      <StatusBar />
    </Terminal></Page>
  </HashRouter>;
}
