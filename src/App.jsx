import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

const resumeData = {
  contact: {
    name: 'Shubham Kumar',
    title: 'Senior Software Development Engineer',
    phone: '+353 858443551 | +91 98359 62051',
    email: 'kumars9@tcd.ie',
    linkedin: 'https://linkedin.com/in/namithubot',
    github: 'https://github.com/namithubot',
  },
  summary: [
    'Senior Software Development Engineer with 8+ years of experience in building distributed systems, cloud services, developer platforms, and full-stack applications.',
    'Proven track record of delivering scalable, reliable, and high-performance solutions across AWS, enterprise software, and SaaS platforms.',
    'Expertise in Web, Cloud, AR/VR, and AI-powered tooling, with a focus on performance optimization, automation, and innovation.',
  ],
  experience: [
    {
      company: 'Amazon Web Services (AWS)',
      role: 'Software Development Engineer II',
      period: 'Jun 2025 – Present',
      highlights: [
        'Led design & implementation of event-driven recurring ticketing platform adopted across Amazon; reduced SLA from 40 min to 3 min with zero release defects.',
        'Delivered infrastructure automation, configuration management, and platform upgrades; reduced failover recovery from 10 min to 3 min, eliminated 150+ annual engineering hours.',
        'Migrated production workloads to next-gen infrastructure; improved memory efficiency by 20%, reduced latency by 15%.',
        'Built AI-powered tooling for scale testing, incident analysis, and onboarding; reduced investigation time from 38 to 14 minutes.',
      ],
    },
    {
      company: 'Omnissa (Formerly Broadcom)',
      role: 'Software Development Engineer',
      period: 'Jun 2024 – Apr 2025',
      highlights: [
        'Refactored & modernized frontend components; reduced production defects by 50%, decreased issue resolution time by 33%.',
        'Developed Mobile Device Management (MDM) capabilities for iOS and macOS with Declarative Device Management (DDM).',
        'Delivered critical customer-facing fixes and platform enhancements for enterprise endpoint management solutions.',
        'Achieved <24-hour resolution time for client escalations, leading to improved client satisfaction.',
      ],
    },
    {
      company: 'Cohesity',
      role: 'Software Development Engineer',
      period: 'Apr 2022 – Aug 2023',
      highlights: [
        'Led development of Microsoft 365 backup capabilities and Active Directory integration supporting 100,000+ users.',
        'Designed upgrade orchestration services improving platform reliability by 40%.',
        'Optimized release pipelines reducing time-to-release by 35% and streamlining CI/CD processes.',
        'Spearheaded localization features expanding market reach by 15%.',
      ],
    },
    {
      company: 'VMware',
      role: 'Software Development Engineer',
      period: '2018 – 2022',
      highlights: [
        'Designed cross-platform Terms of Service framework for unified user agreements.',
        'Introduced UI telemetry achieving 90% user action tracking for improved analytics.',
        'Automated 70% of manual testing processes boosting efficiency in Self Service Portal.',
        'Improved globalization framework reducing package size by 25%.',
        'Enhanced global search improving transaction time by 20%.',
        'Contributed to Angular version upgrades (7 to 9).',
      ],
    },
    {
      company: 'Scapic',
      role: 'Software Developer Intern',
      period: '2017',
      highlights: [
        'Built web-based VR code editor using A-Frame and JavaScript.',
        'Implemented security measures to prevent XSS attacks.',
        'Introduced Redux improving application performance by 30%.',
      ],
    },
  ],
  education: [
    {
      school: 'Trinity College Dublin',
      degree: 'Master of Science (Computer Science)',
      year: '2024',
      detail: 'Thesis: Spatio-Haptic Based Passwords for Enhanced Security in Extended Reality',
      modules: ['Machine Learning', 'Computer Vision', 'Computer Graphics', 'Augmented Reality', 'Motion Picture Engineering'],
    },
    {
      school: 'The National Institute of Engineering (NIE), Mysuru',
      degree: 'Bachelor of Engineering (Information Science)',
      year: '2018',
      modules: ['Java Core', 'Computer Networks', 'Artificial Intelligence', 'Cyber Security'],
    },
  ],
  skills: [
    { category: 'Languages', items: 'JavaScript, TypeScript, Python, C#, Java' },
    { category: 'Frontend', items: 'React.js, Angular, HTML5, CSS3, Redux, Vue.js' },
    { category: 'Backend', items: 'Node.js, Express.js, .NET Core, Django' },
    { category: 'Databases', items: 'PostgreSQL, SQL Server, MongoDB, DynamoDB, Firebase' },
    { category: 'Cloud', items: 'AWS (EC2, S3, Lambda, RDS, DynamoDB), GCP, Azure, Firebase' },
    { category: 'DevOps', items: 'Docker, Kubernetes, Git, CI/CD, Jenkins, Webpack, Babel' },
    { category: 'AR/VR', items: 'Unity, Unreal Engine, ARKit, ARCore, WebXR, A-Frame' },
  ],
  achievements: [
    'Reduced SLA from 40 min to 3 min for event-driven ticketing at AWS',
    'Improved memory efficiency by 20%, reduced latency by 15% via infrastructure migration',
    'Eliminated 150+ annual engineering hours of maintenance overhead via automation',
    'Reduced production defects by 50%, issue resolution time by 33% via code refactoring',
    'Expanded market reach by 15% through localization features',
    'Automated 70% of manual testing processes',
    'Built AI-powered tooling reducing investigation time by 63% (38 to 14 minutes)',
  ],
  projects: [
    { name: 'Event-Driven Ticketing Platform (AWS)', desc: 'Scalable, cross-region platform adopted across Amazon' },
    { name: 'Microsoft 365 Backup & AD Integration', desc: 'Supported 100,000+ users with robust backup solutions at Cohesity' },
    { name: 'MDM Solutions (Omnissa/Broadcom)', desc: 'iOS/macOS MDM capabilities with Declarative Device Management' },
    { name: 'Web-Based VR Editor (Scapic)', desc: 'VR code editor using A-Frame & JavaScript with Redux integration' },
    { name: 'Spatio-Haptic Passwords (Thesis)', desc: 'Research on haptic-based authentication for AR/VR security' },
  ],
};

const bootLines = [
  { text: 'System initialized. Booting kernel...', delay: 200, color: '#00ff41' },
  { text: 'Mounting file systems... [OK]', delay: 300, color: '#00ff41' },
  { text: 'Loading network interfaces... [OK]', delay: 250, color: '#00ff41' },
  { text: 'Starting SSH daemon... [OK]', delay: 200, color: '#00ff41' },
  { text: 'Starting terminal services... [OK]', delay: 300, color: '#00ff41' },
  { text: '', delay: 100, color: '#00ff41' },
  { text: '  ███████╗██╗  ██╗██╗   ██╗██████╗ ██╗  ██╗ █████╗ ███╗   ███╗', delay: 50, color: '#00ff41' },
  { text: '  ██╔════╝██║  ██║██║   ██║██╔══██╗██║  ██║██╔══██╗████╗ ████║', delay: 50, color: '#00ff41' },
  { text: '  ███████╗███████║██║   ██║██████╔╝███████║███████║██╔████╔██║', delay: 50, color: '#00ff41' },
  { text: '  ╚════██║██╔══██║██║   ██║██╔══██╗██╔══██║██╔══██║██║╚██╔╝██║', delay: 50, color: '#00ff41' },
  { text: '  ███████║██║  ██║╚██████╔╝██████╔╝██║  ██║██║  ██║██║ ╚═╝ ██║', delay: 50, color: '#00ff41' },
  { text: '  ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝', delay: 50, color: '#00ff41' },
  { text: '', delay: 100, color: '#00ff41' },
  { text: '  ╔══════════════════════════════════════════════════════════════╗', delay: 30, color: '#00d4ff' },
  { text: '  ║        SHUBHAM KUMAR - Senior SDE @ AWS                  ║', delay: 30, color: '#00d4ff' },
  { text: '  ║  Type "help" to see available commands                     ║', delay: 30, color: '#00d4ff' },
  { text: '  ╚══════════════════════════════════════════════════════════════╝', delay: 30, color: '#00d4ff' },
  { text: '', delay: 200, color: '#00ff41' },
];

const filesystem = {
  'about.txt': () => formatSummary(),
  'experience.txt': () => formatExperience(),
  'education.txt': () => formatEducation(),
  'skills.txt': () => formatSkills(),
  'achievements.txt': () => formatAchievements(),
  'projects.txt': () => formatProjects(),
  'contact.txt': () => formatContact(),
};

const COMMANDS = {
  help: { desc: 'Display available commands', category: 'basic' },
  ls: { desc: 'List files in current directory', category: 'basic' },
  pwd: { desc: 'Print working directory', category: 'basic' },
  clear: { desc: 'Clear the terminal', category: 'basic' },
  cat: { desc: 'cat <filename> - Display file contents', category: 'basic' },
  echo: { desc: 'echo <text> - Print text', category: 'basic' },
  whoami: { desc: 'Display current user info', category: 'info' },
  date: { desc: 'Display current date/time', category: 'info' },
  uptime: { desc: 'Show how long terminal has been active', category: 'info' },
  neofetch: { desc: 'Display system information', category: 'info' },
  sudo: { desc: 'Execute command as root (easter egg)', category: 'fun' },
  banner: { desc: 'Display the welcome banner', category: 'basic' },
  cowsay: { desc: 'Display a cow saying something', category: 'fun' },
  fortune: { desc: 'Display a random quote', category: 'fun' },
};

const fortunes = [
  '"The best way to predict the future is to invent it." - Alan Kay',
  '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler',
  '"First, solve the problem. Then, write the code." - John Johnson',
  '"Talk is cheap. Show me the code." - Linus Torvalds',
  '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
  '"The only way to do great work is to love what you do." - Steve Jobs',
];

function formatSummary() {
  return resumeData.summary.map(s => `  ${s}`).join('\n\n');
}

function formatContact() {
  const c = resumeData.contact;
  return `  Name:     ${c.name}
  Title:    ${c.title}
  Phone:    ${c.phone}
  Email:    ${c.email}
  LinkedIn: ${c.linkedin}
  GitHub:   ${c.github}`;
}

function formatExperience() {
  return resumeData.experience.map(e =>
    `━━━ ${e.company} ━━━
  Role:   ${e.role}
  Period: ${e.period}
  
${e.highlights.map(h => `  ✓ ${h}`).join('\n')}`
  ).join('\n\n');
}

function formatEducation() {
  return resumeData.education.map(e =>
    `━━━ ${e.school} ━━━
  Degree: ${e.degree}
  Year:   ${e.year}
${e.detail ? `\n  ${e.detail}` : ''}
${e.modules ? `\n  Modules: ${e.modules.join(', ')}` : ''}`
  ).join('\n\n');
}

function formatSkills() {
  const maxCatLen = Math.max(...resumeData.skills.map(s => s.category.length));
  return resumeData.skills.map(s =>
    `  ${s.category.padEnd(maxCatLen)}  : ${s.items}`
  ).join('\n');
}

function formatAchievements() {
  return resumeData.achievements.map((a, i) =>
    `  ${i + 1}. ${a}`
  ).join('\n');
}

function formatProjects() {
  return resumeData.projects.map(p =>
    `  ╔ ${p.name}
  ╚═ ${p.desc}`
  ).join('\n\n');
}

const cowsayFaces = [
  '        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||',
];

function App() {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [bootDone, setBootDone] = useState(false);
  const [bootIdx, setBootIdx] = useState(0);
  const [currentDir, setCurrentDir] = useState('/home/shubham');
  const [showTyping, setShowTyping] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [typingLine, setTypingLine] = useState('');
  const [uptimeStart] = useState(Date.now());
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bootIdx < bootLines.length) {
      const line = bootLines[bootIdx];
      const timer = setTimeout(() => {
        setLines(prev => [...prev, { text: line.text, color: line.color, type: 'boot' }]);
        setBootIdx(prev => prev + 1);
      }, line.delay);
      return () => clearTimeout(timer);
    } else {
      setBootDone(true);
      setInput('');
    }
  }, [bootIdx]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines, typingLine]);

  useEffect(() => {
    if (bootDone) {
      inputRef.current?.focus();
    }
  }, [bootDone]);

  const addLine = useCallback((text, color = '#e0e0e0', type = 'output') => {
    setLines(prev => [...prev, { text, color, type }]);
  }, []);

  const getPrompt = () => {
    return `shubham@portfolio:${currentDir}$`;
  };

  const processCommand = useCallback((cmd) => {
    const trimmed = cmd.trim();
    const parts = trimmed.split(/\s+/);
    const command = parts[0]?.toLowerCase() || '';
    const args = parts.slice(1);

    addLine(`${getPrompt()} ${trimmed}`, '#e0e0e0', 'input');

    switch (command) {
      case 'help': {
        const categories = {};
        Object.entries(COMMANDS).forEach(([name, info]) => {
          if (!categories[info.category]) categories[info.category] = [];
          categories[info.category].push(name);
        });
        let output = '  Available Commands:\n';
        Object.entries(categories).forEach(([cat, cmds]) => {
          output += `\n  ${cat.toUpperCase()}:\n`;
          cmds.forEach(c => {
            output += `    ${c.padEnd(15)} ${COMMANDS[c].desc}\n`;
          });
        });
        output += '\n  Tip: Use "cat <filename>" to view resume files. Try: cat about.txt';
        addLine(output);
        break;
      }
      case 'ls': {
        const files = Object.keys(filesystem);
        const cols = 3;
        const maxLen = Math.max(...files.map(f => f.length));
        let output = '  ';
        files.forEach((f, i) => {
          output += f.padEnd(maxLen + 4);
          if ((i + 1) % cols === 0 && i !== files.length - 1) output += '\n  ';
        });
        addLine(output, '#00ff41');
        break;
      }
      case 'pwd':
        addLine(`  ${currentDir}`, '#00d4ff');
        break;
      case 'clear':
        setLines([]);
        break;
      case 'whoami':
        addLine('  shubham', '#00ff41');
        break;
      case 'date':
        addLine(`  ${new Date().toString()}`, '#00d4ff');
        break;
      case 'uptime': {
        const diff = Math.floor((Date.now() - uptimeStart) / 1000);
        const h = Math.floor(diff / 3600);
        const m = Math.floor((diff % 3600) / 60);
        const s = diff % 60;
        addLine(`  up ${h}h ${m}m ${s}s`, '#00ff41');
        break;
      }
      case 'neofetch': {
        addLine(`  shubham@portfolio
  ------------------------
  OS:      Portfolio Linux x86_64
  Host:    GitHub Pages
  Kernel:  6.8.0-portfolio
  Uptime:  ${Math.floor((Date.now() - uptimeStart) / 1000)}s
  Shell:   bash 5.1.16
  CPU:     AMD EPYC (2) @ 2.8GHz
  Memory:  2048MiB / 4096MiB`, '#00ff41');
        break;
      }
      case 'cat': {
        if (!args[0]) {
          addLine('  Usage: cat <filename>', '#ff4444');
          addLine('  Available files: ' + Object.keys(filesystem).join(', '), '#ffd700');
          break;
        }
        const file = args[0];
        if (filesystem[file]) {
          addLine('', '#e0e0e0');
          addLine(filesystem[file](), '#e0e0e0');
          addLine('', '#e0e0e0');
        } else {
          addLine(`  cat: ${file}: No such file`, '#ff4444');
        }
        break;
      }
      case 'echo':
        addLine(`  ${args.join(' ')}`, '#e0e0e0');
        break;
      case 'banner':
        setBootDone(false);
        setBootIdx(0);
        setLines([]);
        break;
      case 'sudo': {
        const sudoCmd = args.join(' ');
        if (sudoCmd.toLowerCase().includes('make me a coffee')) {
          addLine("  Error: Coffee not found. Try 'brew install caffeine'", '#ff4444');
        } else if (sudoCmd.toLowerCase().includes('rm -rf') || sudoCmd.toLowerCase().includes('rm -rf /')) {
          addLine('  Nice try 😄 Nice try 😄', '#ffd700');
        } else if (sudoCmd === 'su') {
          addLine('  root@portfolio:~$ Hello superuser!', '#ff4444');
        } else if (!sudoCmd) {
          addLine('  Usage: sudo <command>', '#ff4444');
        } else {
          addLine(`  [sudo] password for shubham:`, '#ffd700');
          addLine(`  Permission denied. Please try again.`, '#ff4444');
        }
        break;
      }
      case 'cowsay': {
        const msg = args.join(' ') || 'Moo!';
        const width = msg.length + 4;
        const border = '_'.repeat(width);
        const border2 = '-'.repeat(width);
        const cow = `   ${border}
  < ${msg} >
   ${border2}
          \\   ^__^
           \\  (oo)\\_______
              (__)\\       )\\/\\
                  ||----w |
                  ||     ||`;
        addLine(cow, '#00ff41');
        break;
      }
      case 'fortune':
        addLine(`  ${fortunes[Math.floor(Math.random() * fortunes.length)]}`, '#ffd700');
        break;
      case '':
        break;
      default:
        addLine(`  ${command}: command not found. Try 'help' to see available commands.`, '#ff4444');
    }
  }, [addLine, currentDir, uptimeStart]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      processCommand(input);
      setHistory(prev => [...prev, input]);
      setHistoryIdx(-1);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx !== -1) {
        const newIdx = historyIdx + 1;
        if (newIdx >= history.length) {
          setHistoryIdx(-1);
          setInput('');
        } else {
          setHistoryIdx(newIdx);
          setInput(history[newIdx]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = input.split(/\s+/).pop() || '';
      const matches = Object.keys(filesystem).filter(f => f.startsWith(partial));
      const cmdMatches = Object.keys(COMMANDS).filter(c => c.startsWith(partial));
      const allMatches = [...matches, ...cmdMatches];
      if (allMatches.length === 1) {
        const parts = input.split(/\s+/);
        parts[parts.length - 1] = allMatches[0];
        setInput(parts.join(' ') + ' ');
      } else if (allMatches.length > 1) {
        addLine(allMatches.join('  '), '#00d4ff');
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="terminal-container" onClick={handleContainerClick}>
      <div className="terminal">
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="terminal-title">shubham@portfolio: ~/resume</span>
          <div className="terminal-spacer"></div>
        </div>
        <div className="terminal-body" onClick={() => inputRef.current?.focus()}>
          <div className="terminal-output">
            {lines.map((line, i) => (
              <div
                key={i}
                className={`line ${line.type === 'boot' ? 'boot-line' : ''}`}
                style={{ color: line.color || '#e0e0e0' }}
                dangerouslySetInnerHTML={{ __html: line.text }}
              />
            ))}
            {bootDone && (
              <div className="input-line">
                <span className="prompt">
                  <span className="prompt-user">shubham</span>
                  <span className="prompt-at">@</span>
                  <span className="prompt-host">portfolio</span>
                  <span className="prompt-colon">:</span>
                  <span className="prompt-path">{currentDir}</span>
                  <span className="prompt-dollar">$</span>
                </span>
                <div className="input-wrapper">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="terminal-input"
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                  />
                  <span className="cursor-blink">▊</span>
                </div>
              </div>
            )}
          </div>
          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
}

export default App;