import styled from '@emotion/styled';

const Page = styled.section`
  display: grid;
  gap: 28px;
`;

const Header = styled.header`
  display: grid;
  gap: 14px;

  h1 {
    margin: 0;
    color: ${({ theme }) => theme.colors.primary};
    font-size: clamp(2rem, 6vw, 4.4rem);
    letter-spacing: -0.05em;
  }

  p {
    max-width: 820px;
    margin: 0;
    color: ${({ theme }) => theme.colors.muted};
    line-height: 1.75;
  }
`;

const Prompt = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.primarySoft};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.35fr .85fr;
  gap: 18px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.article`
  padding: 22px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.18);

  h2 {
    margin: 0 0 18px;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1rem;
  }
`;

const Timeline = styled.div`
  display: grid;
  gap: 18px;
`;

const Job = styled.section`
  padding-left: 18px;
  border-left: 2px solid ${({ theme }) => theme.colors.border};

  h3 {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem;
  }

  strong {
    display: block;
    margin-top: 5px;
    color: ${({ theme }) => theme.colors.primarySoft};
    font-size: .83rem;
  }

  p {
    margin: 10px 0 0;
    color: ${({ theme }) => theme.colors.muted};
    line-height: 1.65;
    font-size: .9rem;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  span {
    padding: 7px 10px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 999px;
    color: ${({ theme }) => theme.colors.primarySoft};
    background: rgba(0, 255, 102, .04);
    font-size: .76rem;
  }
`;

const Facts = styled.dl`
  display: grid;
  gap: 14px;
  margin: 0;

  div {
    display: grid;
    gap: 4px;
  }

  dt {
    color: ${({ theme }) => theme.colors.muted};
    font-size: .72rem;
    text-transform: uppercase;
    letter-spacing: .08em;
  }

  dd {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.5;
  }
`;

const skills = [
  'React', 'TypeScript', 'JavaScript', 'Redux', 'Emotion', 'Vite',
  'PHP', 'Symfony', 'REST APIs', 'WebSocket', 'WebRTC', 'SIP', 'JsSIP',
  'Linux', 'Docker', 'Nginx', 'Git', 'Go', 'SQL', 'CI/CD',
];

export function CvPage() {
  return (
    <Page>
      <Header>
        <Prompt>$ cat ./cv/filippo-giacche.md</Prompt>
        <h1>Full Stack Developer</h1>
        <p>
          Full stack developer focused on enterprise web applications and real-time communication systems. I work across frontend, backend, Linux and networking, often contributing to architecture decisions, code reviews and the growth of junior developers.
        </p>
      </Header>

      <Grid>
        <Panel>
          <h2>experience.log</h2>
          <Timeline>
            <Job>
              <h3>Full Stack Developer · Kalliope</h3>
              <strong>2021 — present · Italy · Remote</strong>
              <p>
                Development and evolution of web communication platforms using React, TypeScript, PHP and Symfony. Work includes SPA architecture, REST APIs, WebSocket services, SIP/WebRTC integrations, performance optimisation and deployment on Linux/Nginx environments.
              </p>
            </Job>
            <Job>
              <h3>Technical ownership and mentoring</h3>
              <strong>Ongoing responsibilities</strong>
              <p>
                Contribute to architectural decisions, review code, troubleshoot complex production issues and support interns and less experienced developers through implementation and technical guidance.
              </p>
            </Job>
            <Job>
              <h3>Open-source contribution · JsSIP</h3>
              <strong>WebRTC / SIP ecosystem</strong>
              <p>
                Contributed fixes and technical analysis around browser-based SIP, early media, DTMF, ICE negotiation and real-world WebRTC interoperability.
              </p>
            </Job>
          </Timeline>
        </Panel>

        <div style={{ display: 'grid', gap: 18 }}>
          <Panel>
            <h2>profile.info</h2>
            <Facts>
              <div><dt>Location</dt><dd>Umbria, Italy · Full remote</dd></div>
              <div><dt>Role</dt><dd>Full Stack Developer</dd></div>
              <div><dt>Focus</dt><dd>Web platforms, VoIP, real-time systems and software architecture</dd></div>
              <div><dt>Languages</dt><dd>Italian · English</dd></div>
              <div><dt>GitHub</dt><dd>github.com/giacco</dd></div>
            </Facts>
          </Panel>

          <Panel>
            <h2>skills.json</h2>
            <Tags>{skills.map((skill) => <span key={skill}>{skill}</span>)}</Tags>
          </Panel>
        </div>
      </Grid>
    </Page>
  );
}
