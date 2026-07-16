import { useEffect } from 'react';
import styled from '@emotion/styled';

const Sheet = styled.main`
  width: min(210mm, 100%);
  max-width: 100%;
  min-height: 297mm;
  margin: 0 auto;
  padding: 18mm 16mm;
  box-sizing: border-box;
  color: #172033;
  background: #ffffff;
  font-family: Inter, Arial, Helvetica, sans-serif;

  @page {
    size: A4;
    margin: 0;
  }

  @media screen {
    margin-block: 24px;
    box-shadow: 0 20px 70px rgba(0, 0, 0, .24);
  }

  @media print {
    width: 210mm;
    min-height: 297mm;
    margin: 0;
    box-shadow: none;
  }
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
  align-items: end;
  padding-bottom: 14px;
  border-bottom: 2px solid #1f4b78;

  h1 {
    margin: 0;
    color: #15324f;
    font-size: 30px;
    line-height: 1;
    letter-spacing: -.03em;
  }

  h2 {
    margin: 8px 0 0;
    color: #315b82;
    font-size: 14px;
    font-weight: 600;
    overflow-wrap: anywhere;
  }

  @media screen and (max-width: 640px) {
    grid-template-columns: 1fr;
    align-items: start;
  }
`;

const Contact = styled.div`
  display: grid;
  gap: 4px;
  color: #4b5563;
  font-size: 9.5px;
  text-align: right;
  overflow-wrap: anywhere;

  a {
    color: inherit;
    text-decoration: none;
  }

  @media screen and (max-width: 640px) {
    text-align: left;
  }
`;

const Summary = styled.p`
  margin: 14px 0 0;
  color: #374151;
  font-size: 10.5px;
  line-height: 1.55;
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(58mm, .75fr);
  gap: 14mm;
  margin-top: 16px;

  @media screen and (max-width: 760px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
  }
`;

const Section = styled.section`
  break-inside: avoid;
  margin-bottom: 15px;

  h3 {
    margin: 0 0 8px;
    padding-bottom: 4px;
    border-bottom: 1px solid #cbd5e1;
    color: #1f4b78;
    font-size: 11px;
    letter-spacing: .08em;
    text-transform: uppercase;
  }
`;

const Experience = styled.article`
  break-inside: avoid;
  margin-bottom: 12px;

  header {
    display: flex;
    justify-content: space-between;
    gap: 12px;
  }

  h4 {
    margin: 0;
    color: #1f2937;
    font-size: 11px;
  }

  strong {
    color: #315b82;
    font-size: 9px;
    white-space: nowrap;
  }

  p {
    margin: 5px 0 0;
    color: #4b5563;
    font-size: 9.4px;
    line-height: 1.5;
  }

  @media screen and (max-width: 640px) {
    header {
      flex-direction: column;
      align-items: flex-start;
    }

    strong {
      white-space: normal;
    }
  }
`;

const List = styled.ul`
  display: grid;
  gap: 5px;
  margin: 0;
  padding-left: 15px;
  color: #4b5563;
  font-size: 9.4px;
  line-height: 1.45;
`;

const SkillGroup = styled.div`
  margin-bottom: 10px;

  strong {
    display: block;
    margin-bottom: 3px;
    color: #1f2937;
    font-size: 9.5px;
  }

  p {
    margin: 0;
    color: #4b5563;
    font-size: 9px;
    line-height: 1.45;
  }
`;

const Actions = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: flex;
  gap: 10px;

  button {
    min-height: 40px;
    padding: 0 14px;
    border: 0;
    border-radius: 8px;
    color: #fff;
    background: #1f4b78;
    font: inherit;
    cursor: pointer;
  }

  @media screen and (max-width: 640px) {
    right: 12px;
    bottom: 12px;
  }

  @media print {
    display: none;
  }
`;

export function PrintableCvPage() {
  useEffect(() => {
    const shouldPrint = new URLSearchParams(window.location.hash.split('?')[1] ?? '').get('print') === '1';
    if (!shouldPrint) return;

    const timer = window.setTimeout(() => window.print(), 300);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <Sheet>
        <Header>
          <div>
            <h1>Filippo Giacchè</h1>
            <h2>Full Stack Developer · Enterprise Web & Real-Time Communications</h2>
          </div>
          <Contact>
            <span>Umbria, Italy · Full remote</span>
            <a href="mailto:filippo.giacche@gmail.com">filippo.giacche@gmail.com</a>
            <span>github.com/giacco</span>
            <span>linkedin.com/in/filippo-giacchè</span>
          </Contact>
        </Header>

        <Summary>
          Full stack developer with 9+ years of experience building enterprise web applications and real-time communication systems. Strong background in React, TypeScript, PHP/Symfony, Linux and WebRTC/SIP. Experienced in architecture decisions, performance optimization, code review and mentoring.
        </Summary>

        <Columns>
          <div>
            <Section>
              <h3>Professional Experience</h3>
              <Experience>
                <header><h4>Full Stack Developer · Kalliope</h4><strong>2021 — present</strong></header>
                <p>Design and development of an enterprise React/TypeScript softphone platform and Symfony APIs. Work includes SIP over WebSocket, WebRTC media recovery, large-scale phonebook synchronization, frontend architecture, performance optimization, Docker deployments and Nginx configuration.</p>
              </Experience>
              <Experience>
                <header><h4>Full Stack Developer · MC System</h4><strong>2017 — 2021</strong></header>
                <p>Developed Xerox ConnectKey applications and EFI Fiery print-server integrations using JavaScript, PHP and vendor SDKs.</p>
              </Experience>
              <Experience>
                <header><h4>LibreOffice Contributor · University Internship</h4><strong>2016 — 2017</strong></header>
                <p>Fixed bugs in LibreOffice and contributed accepted patches to the official codebase.</p>
              </Experience>
            </Section>

            <Section>
              <h3>Selected Engineering Work</h3>
              <List>
                <li>Architecture and evolution of scalable React/TypeScript SPAs.</li>
                <li>WebRTC, SIP, JsSIP, ICE, STUN and TURN troubleshooting.</li>
                <li>Symfony REST APIs, JSON-RPC and WebSocket integrations.</li>
                <li>Linux, Nginx, Docker and deployment automation.</li>
                <li>Code review, architecture decisions and mentoring of interns.</li>
              </List>
            </Section>

            <Section>
              <h3>Projects</h3>
              <Experience>
                <header><h4>RouterOS · Go</h4><strong>Personal project</strong></header>
                <p>Go daemon exposing REST APIs and WebSocket events, with job-queue architecture and Linux deployment.</p>
              </Experience>
              <Experience>
                <header><h4>JsSIP</h4><strong>Open source</strong></header>
                <p>Contributions and technical work around browser SIP, early media, DTMF and ICE interoperability.</p>
              </Experience>
            </Section>
          </div>

          <aside>
            <Section>
              <h3>Core Skills</h3>
              <SkillGroup><strong>Frontend</strong><p>React, TypeScript, JavaScript, Redux, Emotion, Vite, Webpack</p></SkillGroup>
              <SkillGroup><strong>Backend</strong><p>PHP, Symfony, REST APIs, JSON-RPC, WebSocket, SQL</p></SkillGroup>
              <SkillGroup><strong>Real-time</strong><p>WebRTC, SIP, JsSIP, ICE, STUN, TURN, RTP</p></SkillGroup>
              <SkillGroup><strong>Infrastructure</strong><p>Linux, Docker, Nginx, Ansible, GitHub Actions</p></SkillGroup>
              <SkillGroup><strong>Other</strong><p>Go, networking, software architecture, code review, mentoring</p></SkillGroup>
            </Section>

            <Section>
              <h3>Education</h3>
              <Experience>
                <h4>B.Sc. Computer Science</h4>
                <p>University of Perugia</p>
              </Experience>
            </Section>

            <Section>
              <h3>Open Source</h3>
              <List>
                <li>LibreOffice contributor</li>
                <li>JsSIP contributor</li>
              </List>
            </Section>

            <Section>
              <h3>Languages</h3>
              <SkillGroup><strong>Italian</strong><p>Native</p></SkillGroup>
              <SkillGroup><strong>English</strong><p>Professional working proficiency</p></SkillGroup>
            </Section>
          </aside>
        </Columns>
      </Sheet>
      <Actions>
        <button type="button" onClick={() => window.print()}>Print / Save PDF</button>
      </Actions>
    </>
  );
}
