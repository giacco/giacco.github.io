import styled from '@emotion/styled';

const Bar = styled.footer`
  position: sticky;
  bottom: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 34px;
  padding: 6px 14px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.muted};
  background: rgba(2, 8, 4, 0.96);
  backdrop-filter: blur(12px);
  font-size: 0.7rem;

  @media (max-width: 680px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 3px;
    padding: 8px 12px;
  }
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
`;

const Separator = styled.span`
  opacity: 0.35;
`;

const Available = styled.span`
  color: ${({ theme }) => theme.colors.primarySoft};
`;

export function StatusBar() {
  return (
    <Bar aria-label="Portfolio status">
      <Group>
        <span>React 19</span>
        <Separator aria-hidden="true">│</Separator>
        <span>TypeScript</span>
        <Separator aria-hidden="true">│</Separator>
        <span>Build ✓</span>
      </Group>
      <Group>
        <span>Italy · Remote</span>
        <Separator aria-hidden="true">│</Separator>
        <Available>Available for opportunities</Available>
      </Group>
    </Bar>
  );
}
