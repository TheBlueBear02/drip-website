import './SkillWorkflowDiagram.css';

const ARIA_LABEL =
  'How getDRIP design skills work: the getDRIP Command progressively reads philosophy and tokens, references components, and uses LandingPage as a quality benchmark. skill.json connects to the AI agent, which applies the skill to your project.';

const FILE_H = 28;
const FILE_GAP = 6;
const CONTENT_SHIFT_X = 24;
const REPO_X = 180 + CONTENT_SHIFT_X;
const FILE_X = REPO_X + 14;
const FILE_W = 234;
const FILE_LEFT = FILE_X;
const REPO_Y = 28;
const REPO_TITLE_OFFSET = 18;
const REPO_TITLE_GAP = 20;
const FILE_START_Y = REPO_Y + REPO_TITLE_OFFSET + REPO_TITLE_GAP;

function fileY(index) {
  return FILE_START_Y + index * (FILE_H + FILE_GAP);
}

function fileCenterY(index) {
  return fileY(index) + FILE_H / 2;
}

const RIGHT_X = 620 + CONTENT_SHIFT_X;
const LEFT_X = 24;
const LEFT_W = 112;
const LEFT_H = 50;
const LEFT_RIGHT = LEFT_X + LEFT_W;
const FLOW_STUB_X = LEFT_RIGHT + 24;
const INSTALL_ELBOW_X = 505 + CONTENT_SHIFT_X;
const RIGHT_W = 100;
const RIGHT_H = 36;
const RIGHT_GAP = 66;
const AI_AGENT_Y = 72;

const NODES = {
  agent: { x: LEFT_X, y: 138, w: LEFT_W, h: LEFT_H, label: 'getDRIP Command' },
  repo: { x: REPO_X, y: REPO_Y, w: 262, h: 270, label: 'drip-skills repo' },
  cli: { x: RIGHT_X, y: AI_AGENT_Y, w: RIGHT_W, h: RIGHT_H, label: 'AI Agent' },
  project: {
    x: RIGHT_X - 14,
    y: AI_AGENT_Y + RIGHT_H + RIGHT_GAP,
    w: 128,
    h: 76,
    label: 'Your project',
  },
  entry: { x: FILE_X, y: fileY(0), w: FILE_W, h: FILE_H, label: 'SKILL.md entry', entry: true },
  philosophy: { x: FILE_X, y: fileY(1), w: FILE_W, h: FILE_H, label: 'philosophy.md' },
  tokens: { x: FILE_X, y: fileY(2), w: FILE_W, h: FILE_H, label: 'tokens/*.md' },
  components: { x: FILE_X, y: fileY(3), w: FILE_W, h: FILE_H, label: 'components/*.jsx' },
  examples: { x: FILE_X, y: fileY(4), w: FILE_W, h: FILE_H, label: 'examples/LandingPage.jsx' },
  manifest: { x: FILE_X, y: fileY(5), w: FILE_W, h: FILE_H, label: 'skill.json', manifest: true },
};

const MANIFEST_CY = fileCenterY(5);
const MANIFEST_RIGHT = FILE_X + FILE_W;
const AI_AGENT_CY = AI_AGENT_Y + RIGHT_H / 2;
const AI_AGENT_CX = RIGHT_X + RIGHT_W / 2;

const PATHS = {
  flows: [
    {
      tag: 'progressive read',
      d: `M ${LEFT_RIGHT} 148 H ${FLOW_STUB_X} V ${fileCenterY(1)} H ${FILE_LEFT}`,
      pill: { x: LEFT_RIGHT + 6, y: fileCenterY(1) - 7, w: 78 },
    },
    {
      tag: 'progressive read',
      d: `M ${LEFT_RIGHT} 155 H ${FLOW_STUB_X} V ${fileCenterY(2)} H ${FILE_LEFT}`,
      pill: { x: LEFT_RIGHT + 6, y: fileCenterY(2) - 7, w: 78 },
    },
    {
      tag: 'reference',
      d: `M ${LEFT_RIGHT} 162 H ${FLOW_STUB_X} V ${fileCenterY(3)} H ${FILE_LEFT}`,
      pill: { x: LEFT_RIGHT + 6, y: fileCenterY(3) - 7, w: 58 },
    },
    {
      tag: 'quality benchmark',
      d: `M ${LEFT_RIGHT} 169 H ${FLOW_STUB_X} V ${fileCenterY(4)} H ${FILE_LEFT}`,
      pill: { x: LEFT_RIGHT + 6, y: fileCenterY(4) - 7, w: 96 },
    },
  ],
  install: [
    `M ${MANIFEST_RIGHT} ${MANIFEST_CY} H ${INSTALL_ELBOW_X} V ${AI_AGENT_CY} H ${RIGHT_X}`,
    `M ${AI_AGENT_CX} ${AI_AGENT_Y + RIGHT_H} V ${NODES.project.y}`,
  ],
};

function delayClass(n) {
  return `skill-workflow-diagram__group skill-workflow-diagram__group--d${n}`;
}

function RoutePath({ d, delay = 1, bidirectional = false }) {
  return (
    <path
      d={d}
      className={`skill-workflow-diagram__arrow${bidirectional ? ' skill-workflow-diagram__arrow--bidirectional' : ''} ${delayClass(delay)}`}
    />
  );
}

function Box({ x, y, w, h, label, className, labelClassName = 'skill-workflow-diagram__label', delay = 1, rx = 6 }) {
  return (
    <g className={delayClass(delay)}>
      <rect x={x} y={y} width={w} height={h} rx={rx} className={className} />
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" className={labelClassName}>
        {label}
      </text>
    </g>
  );
}

function FileNode({ node, delay = 1 }) {
  const { x, y, w, h, label, entry, manifest } = node;
  let className = 'skill-workflow-diagram__file';
  if (entry) className += ' skill-workflow-diagram__file--entry';
  if (manifest) className += ' skill-workflow-diagram__file--manifest';

  return (
    <g className={delayClass(delay)}>
      <rect x={x} y={y} width={w} height={h} rx={6} className={className} />
      <text x={x + 10} y={y + h / 2 + 4} className="skill-workflow-diagram__label--file">
        {label}
      </text>
    </g>
  );
}

function ProjectNode({ node, delay = 8 }) {
  const { x, y, w, h, label } = node;
  const pad = 8;
  const mockX = x + pad;
  const mockY = y + 22;
  const mockW = w - pad * 2;
  const mockH = h - 28;
  const innerW = mockW - 8;

  return (
    <g className={delayClass(delay)}>
      <rect x={x} y={y} width={w} height={h} rx={6} className="skill-workflow-diagram__node skill-workflow-diagram__node--project" />
      <text x={x + w / 2} y={y + 13} textAnchor="middle" className="skill-workflow-diagram__label skill-workflow-diagram__label--project">
        {label}
      </text>
      <rect x={mockX} y={mockY} width={mockW} height={mockH} rx={4} className="skill-workflow-diagram__website" />
      <rect x={mockX + 4} y={mockY + 4} width={innerW} height={5} rx={2} className="skill-workflow-diagram__website-bar" />
      <circle cx={mockX + 7} cy={mockY + 6.5} r={1.2} className="skill-workflow-diagram__website-dot" />
      <circle cx={mockX + 11} cy={mockY + 6.5} r={1.2} className="skill-workflow-diagram__website-dot" />
      <circle cx={mockX + 15} cy={mockY + 6.5} r={1.2} className="skill-workflow-diagram__website-dot" />
      <rect x={mockX + 4} y={mockY + 13} width={innerW} height={16} rx={2} className="skill-workflow-diagram__website-hero" />
      <rect x={mockX + 4} y={mockY + 32} width={innerW * 0.72} height={3} rx={1.5} className="skill-workflow-diagram__website-line" />
      <rect x={mockX + 4} y={mockY + 38} width={innerW * 0.48} height={3} rx={1.5} className="skill-workflow-diagram__website-line" />
    </g>
  );
}

function TagPill({ x, y, w, text, delay = 1 }) {
  return (
    <g className={delayClass(delay)}>
      <rect x={x} y={y} width={w} height={14} rx={3} className="skill-workflow-diagram__pill" />
      <text x={x + w / 2} y={y + 10} textAnchor="middle" className="skill-workflow-diagram__label--pill">
        {text}
      </text>
    </g>
  );
}

function SkillWorkflowDiagram() {
  const { agent, repo, cli } = NODES;

  return (
    <svg
      className="skill-workflow-diagram"
      viewBox="0 0 820 328"
      fill="none"
      role="img"
      aria-label={ARIA_LABEL}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker id="skill-diagram-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7" fill="currentColor" />
        </marker>
        <marker
          id="skill-diagram-arrow-start"
          markerWidth="7"
          markerHeight="7"
          refX="1"
          refY="3.5"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L7,3.5 L0,7" fill="currentColor" />
        </marker>
        <filter id="skill-diagram-shadow" x="-4%" y="-4%" width="108%" height="108%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
        </filter>
      </defs>

      {PATHS.flows.map((flow) => (
        <RoutePath key={flow.d} d={flow.d} delay={3} />
      ))}
      {PATHS.install.map((d) => (
        <RoutePath key={d} d={d} delay={8} />
      ))}

      <g className={delayClass(2)} filter="url(#skill-diagram-shadow)">
        <rect x={repo.x} y={repo.y} width={repo.w} height={repo.h} rx={10} className="skill-workflow-diagram__repo" />
        <text x={repo.x + 14} y={repo.y + REPO_TITLE_OFFSET} className="skill-workflow-diagram__label--repo">
          {repo.label}
        </text>
      </g>

      <FileNode node={NODES.entry} delay={2} />
      <FileNode node={NODES.philosophy} delay={3} />
      <FileNode node={NODES.tokens} delay={4} />
      <FileNode node={NODES.components} delay={5} />
      <FileNode node={NODES.examples} delay={6} />
      <FileNode node={NODES.manifest} delay={7} />

      <Box
        x={agent.x}
        y={agent.y}
        w={agent.w}
        h={agent.h}
        label={agent.label}
        labelClassName="skill-workflow-diagram__label skill-workflow-diagram__label--command"
        className="skill-workflow-diagram__node skill-workflow-diagram__node--agent skill-workflow-diagram__node--command"
        delay={1}
      />
      <Box
        x={cli.x}
        y={cli.y}
        w={cli.w}
        h={cli.h}
        label={cli.label}
        className="skill-workflow-diagram__node skill-workflow-diagram__node--external"
        delay={8}
      />
      <ProjectNode node={NODES.project} delay={8} />

      {PATHS.flows.map((flow) => (
        <TagPill key={`${flow.tag}-${flow.pill.y}`} x={flow.pill.x} y={flow.pill.y} w={flow.pill.w} text={flow.tag} delay={3} />
      ))}
    </svg>
  );
}

export default SkillWorkflowDiagram;
