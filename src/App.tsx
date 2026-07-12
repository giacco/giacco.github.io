import { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { BootSequence } from './components/boot/BootSequence';
import { InteractiveShell } from './components/shell/InteractiveShell';

const Page = styled.main`
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 32px 0 64px;

  @media (max-width: 680px) {
    width: min(100% - 20px, 1120px);
    padding-top: 12px;
  }
`;

const Terminal = styled.section`
  min-height: calc(100vh - 96px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 18px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 0 60px ${({ theme }) => theme.colors.shadow};
  backdrop-filter: blur(18px);

  @media (max-width: 680px) {
    min-height: calc(100dvh - 24px);
    border-radius: 12px;
  }
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

  @media (max-width: 680px) {
    min-height: 46px;
    padding: 0 12px;
    grid-template-columns: auto 1fr;
  }
`;

const Dots = styled.div`
  display: flex;
  gap: 7px;
  span { width: 9px; height: 9px; border-radius: 50%; background: ${({ theme }) => theme.colors.primary}; opacity: .45; }
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.78rem;
  text-align: center;
  @media (max-width: 680px) { text-align: right; font-size: .68rem; }
`;

const Navigation = styled.nav`
  display: flex;
  gap: 8px;
  padding: 12px 18px;
  overflow-x: auto;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(0, 0, 0, 0.18);
  scrollbar-width: none;

  &::-webkit-scrollbar { display: none; }

  a {
    flex: 0 0 auto;
    min-height: 40px;
    display: inline-flex;
    align-items: center;
    padding: 0 13px;
    border: 1px solid transparent;
    border-radius: 7px;
    color: ${({ theme }) => theme.colors.muted};
    text-decoration: none;
    font-size: .78rem;
  }

  a:hover, a:focus-visible {
    color: ${({ theme }) => theme.colors.primarySoft};
    border-color: ${({ theme }) => theme.colors.border};
    outline: none;
  }

  @media (max-width: 680px) { padding: 9px 12px; }
`;

const Body = styled.div`
  padding: clamp(22px, 5vw, 72px);
  display: grid;
  gap: 56px;

  section { scroll-margin-top: 20px; }

  @media (max-width: 680px) {
    padding: 22px 16px 34px;
    gap: 38px;
  }
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
  letter-spacing: -0.07em;
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

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
`;

const Action = styled.a`
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.primarySoft};
  text-decoration: none;
  background: rgba(0, 255, 102, 0.04);
  transition: .2s ease;

  &:hover, &:focus-visible {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.primary};
    background: rgba(0, 255, 102, 0.09);
    outline: none;
  }

  @media (max-width: 480px) { flex: 1 1 100%; }
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
  background: rgba(0, 0, 0, 0.18);

  h3 { margin: 0 0 10px; color: ${({ theme }) => theme.colors.primary}; font-size: .95rem; }
  p { margin: 0; color: ${({ theme }) => theme.colors.muted}; line-height: 1.65; font-size: .88rem; }
`;

const Status = styled.footer`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: .72rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 18px;
  @media (max-width: 560px) { flex-direction: column; }
`;

const cards = [
  ['frontend.stack', 'React, TypeScript, Redux, Emotion, Vite and scalable SPA architecture.'],
  ['realtime.stack', 'WebRTC, SIP, JsSIP, WebSocket, ICE, STUN, TURN and VoIP troubleshooting.'],
  ['backend.ops', 'PHP, Symfony, REST APIs, Linux, Docker, Nginx, Go and automation.'],
];

function shouldShowBoot() {
  return typeof window !== 'undefined' && sessionStorage.getItem('portfolio-booted') !== 'true';
}

export default function App() {
  const [isBooting, setIsBooting] = useState(shouldShowBoot);

  const completeBoot = useCallback(() => {
    sessionStorage.setItem('portfolio-booted', 'true');
    setIsBooting(false);
  }, []);

  return (
    <>
      {isBooting && <BootSequence onComplete={completeBoot} />}
      <Page>
        <Terminal>
          <Bar>
            <Dots><span /><span /><span /></Dots>
            <Title>guest@giacco:~/portfolio</Title>
            <div />
          </Bar>
          <Navigation aria-label="Portfolio sections">
            <a href="#home">./home</a>
            <a href="#skills">./skills</a>
            <a href="#shell">./shell</a>
            <a href="#contact">./contact</a>
          </Navigation>
          <Body>
            <section id="home">
              <Prompt>$ whoami</Prompt>
              <HeroTitle initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
                Filippo Giacchè
              </HeroTitle>
              <Role>Senior Full Stack Developer</Role>
              <Intro>
                I build enterprise web applications and real-time communication platforms, combining frontend engineering, backend development, Linux, networking and open-source contributions.
              </Intro>
            </section>

            <section id="skills">
              <Prompt>$ cat core-skills.txt</Prompt>
              <Grid>
                {cards.map(([title, body], index) => (
                  <Card key={title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }}>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </Card>
                ))}
              </Grid>
            </section>

            <section id="shell">
              <Prompt>$ ./portfolio-shell</Prompt>
              <InteractiveShell />
            </section>

            <section id="contact">
              <Prompt>$ ls ./contact</Prompt>
              <Actions>
                <Action href="https://github.com/giacco" target="_blank" rel="noreferrer">./github</Action>
                <Action href="https://www.linkedin.com/in/filippo-giacchè" target="_blank" rel="noreferrer">./linkedin</Action>
                <Action href="mailto:filippo.giacche@gmail.com">./email</Action>
              </Actions>
            </section>

            <Status>
              <span>STATUS: available for remote opportunities</span>
              <span>LOCATION: Italy · REMOTE</span>
            </Status>
          </Body>
        </Terminal>
      </Page>
    </>
  );
}
