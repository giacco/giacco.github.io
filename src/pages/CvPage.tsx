import styled from '@emotion/styled';

const profileImagePath = '/asset/profile.jpeg';
const certificateDownloadPath = encodeURI('/asset/Filippo giacchè.pdf');
const certificateDownloadName = 'filippo-giacche-libreoffice-certificate.pdf';
const printableCvRoute = '/cv/print';
const printableCvPrintRoute = '/cv/print?print=1';

function navigate(route: string) {
  window.location.hash = route;
}

const Page = styled.section`
  display: grid;
  gap: 24px;

  @media print {
    color: #111;
    background: #fff;
  }
`;

const Hero = styled.header`
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 24px;
  align-items: center;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  background: rgba(0, 0, 0, .18);

  @media (max-width: 680px) { grid-template-columns: 1fr; }
  @media print { border-color: #bbb; background: #fff; }
`;

const Photo = styled.div`
  aspect-ratio: 1;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: rgba(0, 255, 102, .03);
`;

const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const Intro = styled.div`
  h1 { margin: 4px 0 0; color: ${({ theme }) => theme.colors.primary}; font-size: clamp(2rem, 6vw, 4.2rem); letter-spacing: -.05em; }
  h2 { margin: 8px 0 0; color: ${({ theme }) => theme.colors.text}; font-size: 1.15rem; font-weight: 500; }
  p { max-width: 820px; margin: 16px 0 0; color: ${({ theme }) => theme.colors.muted}; line-height: 1.75; }
`;

const Prompt = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.primarySoft};
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;

  a, button {
    min-height: 40px;
    display: inline-flex;
    align-items: center;
    padding: 0 13px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.primarySoft};
    background: rgba(0, 255, 102, .04);
    text-decoration: none;
    font: inherit;
    cursor: pointer;
  }

  @media print { display: none; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.35fr .85fr;
  gap: 18px;
  @media (max-width: 860px) { grid-template-columns: 1fr; }
`;

const Panel = styled.article`
  padding: 22px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: rgba(0, 0, 0, .18);
  break-inside: avoid;

  h2 { margin: 0 0 18px; color: ${({ theme }) => theme.colors.primary}; font-size: 1rem; }
  p, li { color: ${({ theme }) => theme.colors.muted}; line-height: 1.65; }
  ul { margin: 0; padding-left: 18px; }
  @media print { border-color: #bbb; background: #fff; }
`;

const Timeline = styled.div`
  display: grid;
  gap: 20px;
`;

const Job = styled.section`
  padding-left: 18px;
  border-left: 2px solid ${({ theme }) => theme.colors.border};

  h3 { margin: 0; color: ${({ theme }) => theme.colors.text}; font-size: 1rem; }
  strong { display: block; margin-top: 5px; color: ${({ theme }) => theme.colors.primarySoft}; font-size: .82rem; }
  p { margin: 10px 0 0; font-size: .9rem; }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  span { padding: 7px 10px; border: 1px solid ${({ theme }) => theme.colors.border}; border-radius: 999px; color: ${({ theme }) => theme.colors.primarySoft}; background: rgba(0, 255, 102, .04); font-size: .75rem; }
`;

const Facts = styled.dl`
  display: grid;
  gap: 14px;
  margin: 0;
  div { display: grid; gap: 4px; }
  dt { color: ${({ theme }) => theme.colors.muted}; font-size: .7rem; text-transform: uppercase; letter-spacing: .08em; }
  dd { margin: 0; color: ${({ theme }) => theme.colors.text}; line-height: 1.5; }
`;

const CertificateCard = styled.div`
  display: grid;
  gap: 10px;
  min-height: 150px;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background: rgba(0, 255, 102, .03);

  strong {
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin: 0;
  }
`;

const skills = [
  'React', 'TypeScript', 'JavaScript', 'Redux', 'Emotion', 'Vite', 'Webpack',
  'PHP', 'Symfony', 'REST APIs', 'JSON-RPC', 'WebSocket', 'WebRTC', 'SIP', 'JsSIP',
  'Linux', 'Docker', 'Nginx', 'Git', 'GitHub Actions', 'Ansible', 'Go', 'MySQL', 'SQLite',
  'TCP/IP', 'NAT', 'ICE', 'STUN', 'TURN', 'TLS', 'Software Architecture', 'Code Review',
];

export function CvPage() {
  return (
    <Page>
      <Hero>
        <Photo>
          <PhotoImage src={profileImagePath} alt="Profile portrait of Filippo Giacchè" />
        </Photo>
        <Intro>
          <Prompt>$ cat ./cv/filippo-giacche.md</Prompt>
          <h1>Filippo Giacchè</h1>
          <h2>Full Stack Developer · Enterprise Web & Real-Time Communications</h2>
          <p>
            Full stack developer with 9+ years of experience building enterprise web applications. Specialized in React, TypeScript, PHP/Symfony, Linux and real-time communication technologies including WebRTC, SIP and WebSocket. Experienced in architecture decisions, performance optimization, code review and mentoring.
          </p>
          <Actions>
            <a href="https://github.com/giacco" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/filippo-giacchè" target="_blank" rel="noreferrer">LinkedIn</a>
            <button type="button" onClick={() => navigate(printableCvRoute)}>Show printable CV</button>
            <button type="button" onClick={() => navigate(printableCvPrintRoute)}>Print / Save PDF</button>
          </Actions>
        </Intro>
      </Hero>

      <Grid>
        <div style={{ display: 'grid', gap: 18 }}>
          <Panel>
            <h2>engineering-highlights.md</h2>
            <ul>
              <li>Design and evolution of scalable React/TypeScript SPAs.</li>
              <li>Deep experience with WebRTC, SIP, JsSIP, ICE, STUN and TURN.</li>
              <li>Symfony REST APIs, JSON-RPC and WebSocket integrations.</li>
              <li>Linux, Nginx, Docker and deployment automation.</li>
              <li>Architecture decisions, code review and mentoring of interns.</li>
              <li>Open-source contributions to LibreOffice and JsSIP.</li>
            </ul>
          </Panel>

          <Panel>
            <h2>experience.log</h2>
            <Timeline>
              <Job>
                <h3>Full Stack Developer · Kalliope</h3>
                <strong>2021 — present · Italy · Remote</strong>
                <p>Development of an enterprise React softphone platform and Symfony APIs. Work includes SIP over WebSocket, WebRTC media recovery, large-scale phonebook synchronization, frontend architecture, performance optimization, Docker deployments and Nginx configuration.</p>
              </Job>
              <Job>
                <h3>Full Stack Developer · MC System</h3>
                <strong>2017 — 2021 · Umbria, Italy</strong>
                <p>Developed Xerox ConnectKey applications and EFI Fiery print-server integrations using JavaScript, PHP and vendor SDKs.</p>
              </Job>
              <Job>
                <h3>LibreOffice Contributor · University Internship</h3>
                <strong>2016 — 2017</strong>
                <p>Fixed bugs in LibreOffice and contributed accepted patches to the official codebase.</p>
              </Job>
            </Timeline>
          </Panel>

          <Panel>
            <h2>selected-projects.json</h2>
            <Timeline>
              <Job><h3>Kalliope Web Platform</h3><p>Enterprise SPA, SIP/WebRTC, Symfony APIs, Docker, Nginx and large-scale data optimization.</p></Job>
              <Job><h3>RouterOS · Go</h3><p>Personal Go daemon with REST APIs, WebSocket events, job queue architecture and Linux deployment.</p></Job>
              <Job><h3>JsSIP</h3><p>Contributions and technical work around browser SIP, early media, DTMF and ICE interoperability.</p></Job>
            </Timeline>
          </Panel>
        </div>

        <div style={{ display: 'grid', gap: 18, alignContent: 'start' }}>
          <Panel>
            <h2>profile.info</h2>
            <Facts>
              <div><dt>Location</dt><dd>Umbria, Italy · Full remote</dd></div>
              <div><dt>Role</dt><dd>Full Stack Developer</dd></div>
              <div><dt>Experience</dt><dd>9+ years</dd></div>
              <div><dt>Education</dt><dd>B.Sc. Computer Science · University of Perugia</dd></div>
              <div><dt>Languages</dt><dd>Italian · English</dd></div>
              <div><dt>Email</dt><dd>filippo.giacche@gmail.com</dd></div>
            </Facts>
          </Panel>

          <Panel>
            <h2>skills.json</h2>
            <Tags>{skills.map((skill) => <span key={skill}>{skill}</span>)}</Tags>
          </Panel>

          <Panel>
            <h2>certifications/</h2>
            <CertificateCard>
              <strong>LibreOffice First Patch Certificate</strong>
              <p>Attestation PDF available to view in the browser or download locally.</p>
            </CertificateCard>
            <Actions>
              <a href={certificateDownloadPath} target="_blank" rel="noreferrer">Show certificate</a>
              <a href={certificateDownloadPath} download={certificateDownloadName}>Download certificate</a>
            </Actions>
          </Panel>
        </div>
      </Grid>
    </Page>
  );
}
