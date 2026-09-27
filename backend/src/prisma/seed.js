import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Clear existing data to allow idempotent re-seeding
  await prisma.message.deleteMany();
  await prisma.media.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.service.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.project.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.about.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Existing data wiped clean.');

  // 2. Seed Admin User
  const adminPasswordHash = await bcrypt.hash('Admin@12345', 10);
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@portfolio.local',
      password: adminPasswordHash,
      name: 'Vamsi Krishna',
      role: 'ADMIN'
    }
  });
  console.log(`👤 Admin user created: ${adminUser.email} (Password: Admin@12345)`);

  // 3. Seed About Details
  const about = await prisma.about.create({
    data: {
      name: 'Vamsi Krishna',
      title: 'Senior Full-Stack Engineer & Cloud Architect',
      shortBio: 'Crafting high-performance web applications, scalable distributed backends, and elegant developer tools with modern web technologies.',
      fullBio: `I am a passionate Full-Stack Engineer with 5+ years of experience engineering mission-critical software solutions. My core expertise spans modern JavaScript/TypeScript ecosystems, high-throughput Node.js microservices, PostgreSQL query optimization, and resilient cloud architectures.\n\nI focus on developer ergonomics, clean domain-driven architecture, robust security, and seamless user experiences. When I'm not architecting systems or writing code, I actively contribute to open-source software, write technical articles, and mentor aspiring developers.`,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      resumeUrl: '#',
      email: 'vamsi.portfolio.dev@gmail.com',
      phone: '+1 (555) 349-8201',
      location: 'San Francisco, CA (Open to Remote)',
      yearsExperience: 5,
      completedProjects: 28,
      happyClients: 22,
      githubUrl: 'https://github.com',
      linkedinUrl: 'https://linkedin.com',
      twitterUrl: 'https://twitter.com',
      leetcodeUrl: 'https://leetcode.com',
      isAvailable: true
    }
  });
  console.log(`ℹ️ About information seeded for: ${about.name}`);

  // 4. Seed Skills
  const skillsData = [
    // Frontend
    { name: 'React.js / Next.js', category: 'Frontend', proficiency: 95, icon: 'Code2', order: 1 },
    { name: 'TypeScript', category: 'Frontend', proficiency: 92, icon: 'FileCode2', order: 2 },
    { name: 'Tailwind CSS & UI Systems', category: 'Frontend', proficiency: 96, icon: 'Palette', order: 3 },
    { name: 'State Management (Redux/Zustand)', category: 'Frontend', proficiency: 90, icon: 'Layers', order: 4 },
    
    // Backend
    { name: 'Node.js & Express', category: 'Backend', proficiency: 94, icon: 'Server', order: 5 },
    { name: 'REST & GraphQL APIs', category: 'Backend', proficiency: 92, icon: 'Network', order: 6 },
    { name: 'Python & FastAPI', category: 'Backend', proficiency: 85, icon: 'Terminal', order: 7 },
    { name: 'Microservices & Event-Driven', category: 'Backend', proficiency: 88, icon: 'Cpu', order: 8 },

    // Database
    { name: 'PostgreSQL & Prisma ORM', category: 'Database', proficiency: 94, icon: 'Database', order: 9 },
    { name: 'Redis Caching & PubSub', category: 'Database', proficiency: 88, icon: 'Zap', order: 10 },
    { name: 'MongoDB & DynamoDB', category: 'Database', proficiency: 84, icon: 'HardDrive', order: 11 },

    // DevOps & Cloud
    { name: 'Docker & Containerization', category: 'DevOps & Cloud', proficiency: 90, icon: 'Box', order: 12 },
    { name: 'AWS (ECS, S3, RDS, Lambda)', category: 'DevOps & Cloud', proficiency: 86, icon: 'Cloud', order: 13 },
    { name: 'CI/CD Pipelines (GitHub Actions)', category: 'DevOps & Cloud', proficiency: 92, icon: 'GitBranch', order: 14 },
    { name: 'Monitoring & Logging (Datadog/Sentry)', category: 'DevOps & Cloud', proficiency: 85, icon: 'Activity', order: 15 }
  ];

  for (const skill of skillsData) {
    await prisma.skill.create({ data: skill });
  }
  console.log(`⚡ Seeded ${skillsData.length} skills across categories.`);

  // 5. Seed Projects
  const projectsData = [
    {
      title: 'DevPulse - Autonomous AI CI/CD Orchestrator',
      slug: 'devpulse-ai-cicd-orchestrator',
      summary: 'Real-time telemetry, automated failure remediation, and dynamic deployment pipeline engine built for enterprise teams.',
      description: 'DevPulse is an enterprise-grade cloud automation platform that monitors build artifacts, predicts deployment vulnerabilities using ML models, and provides automated rollbacks. Built with Node.js, WebSockets, PostgreSQL, and a reactive React dashboard.',
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      technologies: 'React, Node.js, PostgreSQL, Prisma, Docker, Tailwind CSS, WebSockets',
      liveUrl: 'https://devpulse-demo.example.com',
      githubUrl: 'https://github.com/example/devpulse',
      featured: true,
      order: 1
    },
    {
      title: 'NexusCommerce - Distributed Multi-Vendor Marketplace',
      slug: 'nexus-commerce-marketplace',
      summary: 'High-throughput e-commerce platform processing sub-50ms checkouts with Stripe Connect, inventory locks, and Redis caching.',
      description: 'Engineered a scalable multi-tenant e-commerce backend handling concurrent product auctions and high-traffic flash sales. Features atomic inventory reservation with Redis transactions, webhook idempotency, and full audit logging.',
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
      technologies: 'Next.js, Express, PostgreSQL, Redis, Stripe API, Tailwind CSS',
      liveUrl: 'https://nexuscommerce.example.com',
      githubUrl: 'https://github.com/example/nexus-commerce',
      featured: true,
      order: 2
    },
    {
      title: 'CloudVault - Zero-Knowledge Encrypted Storage',
      slug: 'cloudvault-encrypted-storage',
      summary: 'Client-side AES-256-GCM encrypted file sharing platform with time-limited access tokens and streaming chunk uploads.',
      description: 'Secure cloud storage service where files are encrypted in the browser before transmission. The server never receives unencrypted contents or decryption keys. Includes fine-grained permission controls and automatic link expiration.',
      coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80',
      technologies: 'React, TypeScript, Express, Web Crypto API, AWS S3, Prisma',
      liveUrl: 'https://cloudvault.example.com',
      githubUrl: 'https://github.com/example/cloudvault',
      featured: true,
      order: 3
    },
    {
      title: 'StreamFlow - Real-time Collaborative Canvas',
      slug: 'streamflow-collaborative-canvas',
      summary: 'Low-latency infinite canvas for engineering diagramming with multi-cursor CRDT synchronization and export pipelines.',
      description: 'StreamFlow allows distributed teams to sketch, design architecture diagrams, and brainstorm collaboratively in real-time. Employs Conflict-free Replicated Data Types (CRDTs) over WebSockets with 60 FPS Canvas rendering.',
      coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
      technologies: 'React, HTML5 Canvas, Node.js, WebSockets, Redis PubSub',
      liveUrl: 'https://streamflow.example.com',
      githubUrl: 'https://github.com/example/streamflow',
      featured: false,
      order: 4
    },
    {
      title: 'KubeMetrics - Lightweight Kubernetes Pod Monitor',
      slug: 'kubemetrics-pod-monitor',
      summary: 'Terminal and web-based dashboard for live Kubernetes cluster resource consumption and threshold anomaly alerts.',
      description: 'Monitors pod memory pressure, CPU saturation, and ingress request latency in real-time with zero overhead. Integrated with Prometheus metrics and automated Discord/Slack alerting webhooks.',
      coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
      technologies: 'Go, React, Tailwind CSS, Prometheus, Docker',
      liveUrl: 'https://kubemetrics.example.com',
      githubUrl: 'https://github.com/example/kubemetrics',
      featured: false,
      order: 5
    }
  ];

  for (const project of projectsData) {
    await prisma.project.create({ data: project });
  }
  console.log(`🚀 Seeded ${projectsData.length} projects.`);

  // 6. Seed Experience Timeline
  const experienceData = [
    {
      role: 'Staff Full-Stack Engineer',
      company: 'Apex Cloud Systems',
      companyUrl: 'https://example.com',
      location: 'San Francisco, CA',
      type: 'Full-time',
      startDate: '2023 - Present',
      endDate: 'Present',
      isCurrent: true,
      description: 'Lead architect for the core cloud orchestration dashboard used by 150K+ developers. Spearheaded frontend migration to Vite/React with 40% improvement in load times.',
      achievements: JSON.stringify([
        'Architected real-time WebSocket infrastructure handling 50k concurrent connections.',
        'Reduced database query p99 latency from 240ms to 18ms via PostgreSQL indexing & Redis caching.',
        'Mentored 8 junior and mid-level engineers in clean code and test-driven development.'
      ]),
      technologies: 'React, Node.js, TypeScript, PostgreSQL, Prisma, AWS, Docker',
      order: 1
    },
    {
      role: 'Senior Software Engineer',
      company: 'Nova Interactive Labs',
      companyUrl: 'https://example.com',
      location: 'Austin, TX (Remote)',
      type: 'Full-time',
      startDate: '2021',
      endDate: '2023',
      isCurrent: false,
      description: 'Built scalable backend microservices and responsive web applications for fintech and healthcare clients. Designed secure REST APIs and automated CI/CD deployment pipelines.',
      achievements: JSON.stringify([
        'Engineered payment processing pipeline complying with PCI-DSS standards.',
        'Implemented custom headless CMS powering 12 enterprise client sites.',
        'Achieved 99.98% uptime across all production production clusters.'
      ]),
      technologies: 'Express.js, React, PostgreSQL, Docker, Redis, Tailwind CSS',
      order: 2
    },
    {
      role: 'Full-Stack Developer',
      company: 'PixelCraft Digital Agency',
      companyUrl: 'https://example.com',
      location: 'Seattle, WA',
      type: 'Full-time',
      startDate: '2019',
      endDate: '2021',
      isCurrent: false,
      description: 'Developed modern web applications, interactive landing pages, and customized content management solutions for startup clients.',
      achievements: JSON.stringify([
        'Delivered 20+ responsive web applications from design handoff to production.',
        'Improved Core Web Vitals scores across all client portals to 95+.'
      ]),
      technologies: 'JavaScript, React, Node.js, MongoDB, SCSS, Webpack',
      order: 3
    }
  ];

  for (const exp of experienceData) {
    await prisma.experience.create({ data: exp });
  }
  console.log(`💼 Seeded ${experienceData.length} experience timeline entries.`);

  // 7. Seed Services
  const servicesData = [
    {
      title: 'Full-Stack Web Development',
      description: 'End-to-end web application engineering from responsive frontend interfaces to scalable backend APIs and relational databases.',
      icon: 'Layout',
      features: 'React & Next.js SPAs/MPAs, RESTful & GraphQL APIs, Database Modeling & Migrations, Authentication & Role-Based Access Control',
      order: 1
    },
    {
      title: 'Custom CMS & Admin Dashboards',
      description: 'Tailored content management systems, analytics dashboards, and operational admin panels built without heavy third-party lock-in.',
      icon: 'Sliders',
      features: 'Dynamic CRUD Interfaces, Media Upload Pipelines, Real-time Metrics & Reporting, Granular Admin Permissions',
      order: 2
    },
    {
      title: 'API Architecture & Microservices',
      description: 'Designing resilient, secure, and well-documented REST APIs with high throughput, rate limiting, and comprehensive validation.',
      icon: 'Cpu',
      features: 'Express & Node.js Backends, Zod / Schema Validation, PostgreSQL Query Optimization, Redis In-Memory Caching',
      order: 3
    },
    {
      title: 'DevOps, Docker & Cloud Deployment',
      description: 'Streamlined containerization, continuous integration workflows, automated testing, and zero-downtime deployments.',
      icon: 'CloudLightning',
      features: 'Docker Multi-stage Builds, GitHub Actions CI/CD, Production Environment Hardening, SSL & Reverse Proxy Setup',
      order: 4
    }
  ];

  for (const svc of servicesData) {
    await prisma.service.create({ data: svc });
  }
  console.log(`🛠️ Seeded ${servicesData.length} service offerings.`);

  // 8. Seed Testimonials
  const testimonialsData = [
    {
      clientName: 'Sarah Jenkins',
      clientRole: 'VP of Engineering',
      clientCompany: 'CloudScale Technologies',
      clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      content: 'Vamsi is an exceptional software engineer who transformed our complex legacy platform into an ultra-fast modern stack. His attention to architecture, security, and developer experience is world-class.',
      projectTitle: 'DevPulse Orchestrator',
      order: 1
    },
    {
      clientName: 'Marcus Vance',
      clientRole: 'Founder & CEO',
      clientCompany: 'Nexus Marketplaces',
      clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      content: 'Working with Vamsi was seamless. He delivered our multi-vendor platform ahead of schedule with zero post-launch bugs. Highly recommended for any serious web application development.',
      projectTitle: 'NexusCommerce Platform',
      order: 2
    },
    {
      clientName: 'Elena Rostova',
      clientRole: 'Principal Product Manager',
      clientCompany: 'Aura Fintech',
      clientAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      content: 'Vamsi combines deep backend engineering prowess with an eye for refined, intuitive user interfaces. The custom CMS he engineered for our team saved us dozens of operational hours every week.',
      projectTitle: 'Aura Admin Suite',
      order: 3
    }
  ];

  for (const item of testimonialsData) {
    await prisma.testimonial.create({ data: item });
  }
  console.log(`💬 Seeded ${testimonialsData.length} testimonials.`);

  // 9. Seed Blogs
  const blogsData = [
    {
      title: 'Architecting Resilient PostgreSQL Backends with Prisma in 2026',
      slug: 'architecting-resilient-postgresql-backends-prisma-2026',
      excerpt: 'A comprehensive deep dive into connection pooling, transaction isolation, indexed query plans, and schema migrations with Prisma ORM.',
      content: `# Architecting Resilient PostgreSQL Backends with Prisma

Modern web backends require high availability, predictable latencies, and bulletproof data integrity. In this guide, we explore production patterns for orchestrating PostgreSQL databases alongside Prisma ORM in high-throughput Node.js microservices.

## 1. Connection Pool Tuning
When deploying Node.js apps in containerized environments, ensuring optimal connection pool limits is essential to prevent exhausting database resources while maximizing concurrency.

\`\`\`javascript
const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL + '&connection_limit=20&pool_timeout=10'
});
\`\`\`

## 2. Compound Indexing Strategies
Prisma allows declarative compound indices in \`schema.prisma\`. Ensure your most frequently filtered fields (e.g. \`[userId, createdAt]\`) are properly indexed.

## 3. Atomic Interactive Transactions
Prevent race conditions during critical financial or inventory updates by leveraging Prisma's interactive transaction API:

\`\`\`javascript
const result = await prisma.$transaction(async (tx) => {
  const account = await tx.account.findUnique({ where: { id: accountId } });
  if (account.balance < amount) throw new Error('Insufficient funds');
  
  return await tx.account.update({
    where: { id: accountId },
    data: { balance: { decrement: amount } }
  });
});
\`\`\`

## Conclusion
By combining typed schemas, automated migrations, and deliberate query structures, Prisma and PostgreSQL form a powerhouse stack for modern software teams.`,
      coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1000&q=80',
      tags: 'PostgreSQL, Node.js, Prisma, Backend, Architecture',
      author: 'Vamsi Krishna',
      readTime: '6 min read',
      published: true,
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      title: 'Building Zero-Dependency Custom CMS Panels with React and Tailwind',
      slug: 'building-zero-dependency-custom-cms-react-tailwind',
      excerpt: 'Why off-the-shelf headless CMS systems may slow you down, and how building a custom admin suite gives complete architectural freedom.',
      content: `# Building Zero-Dependency Custom CMS Panels

Many development teams default to heavy third-party headless CMS tools. While convenient initially, they often introduce vendor lock-in, rigid data schemas, high licensing fees, and clumsy plugin ecosystems.

## The Advantage of Custom CMS
1. **Zero Bloat**: You only build the fields and controls your application actually needs.
2. **Unified Database**: Content resides alongside user data in your primary PostgreSQL instance.
3. **Exact Brand Control**: Seamless styling using Tailwind CSS matching your design tokens.

## Designing the API Layer
Keep your endpoints predictable, RESTful, and guarded by JWT middleware:
- \`GET /api/projects\` (Public list)
- \`POST /api/projects\` (Admin create with file upload)
- \`PUT /api/projects/:id\` (Admin edit)
- \`DELETE /api/projects/:id\` (Admin delete)

## Responsive Data Tables & Fast Modals
Utilizing simple state hooks and modal portals provides an instant, desktop-grade admin experience without the weight of 50 external npm dependencies.`,
      coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
      tags: 'React, Tailwind CSS, CMS, Full-Stack',
      author: 'Vamsi Krishna',
      readTime: '5 min read',
      published: true,
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      title: 'Mastering Full-Stack JWT Authentication & Secure Refresh Tokens',
      slug: 'mastering-full-stack-jwt-authentication-refresh-tokens',
      excerpt: 'How to safely implement short-lived access tokens, refresh token rotation, and robust authorization guards in Express.',
      content: `# Mastering Full-Stack JWT Authentication

JSON Web Tokens (JWT) are widely adopted, yet frequently implemented with critical security oversights. Let's break down the golden standard for token lifecycle management.

## 1. Short-Lived Access Tokens
Access tokens should carry a brief validity window (e.g., 10-15 minutes). This limits the exposure window if a token is intercepted.

## 2. Refresh Token Rotation
Each time a refresh token is exchanged for a new access token, issue a brand new refresh token and invalidate the old one in the database.

## 3. Axios Interceptor with Automatic Re-authentication
In the frontend React/Axios service, intercept \`401 Unauthorized\` responses, transparently call \`/api/auth/refresh\`, replay the original request, or redirect to login if the session expired.

\`\`\`javascript
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newTokens = await refreshSession();
      // retry original request...
    }
    return Promise.reject(error);
  }
);
\`\`\`

## Summary
By enforcing proper rotation, bcrypt hashing, and rate limiting, your API authentication remains ironclad.`,
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
      tags: 'Security, JWT, Express, Authentication',
      author: 'Vamsi Krishna',
      readTime: '7 min read',
      published: true,
      publishedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
    }
  ];

  for (const blog of blogsData) {
    await prisma.blog.create({ data: blog });
  }
  console.log(`📝 Seeded ${blogsData.length} blog articles.`);

  // 10. Seed Sample Media Record
  await prisma.media.create({
    data: {
      filename: 'sample-project-mockup.webp',
      originalName: 'DevPulse Architecture Dashboard.webp',
      mimeType: 'image/webp',
      size: 142850,
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      altText: 'DevPulse Architecture Dashboard preview'
    }
  });

  // 11. Seed Sample Initial Contact Messages
  await prisma.message.createMany({
    data: [
      {
        name: 'Alexander Wright',
        email: 'alex.wright@venturecapital.io',
        subject: 'Lead Engineer Opportunity - Series B Fintech',
        message: 'Hi Vamsi, I reviewed your open-source projects and portfolio. We are expanding our engineering team at Venture Capital Labs and would love to discuss a Staff Full-Stack role with you.',
        isRead: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        name: 'Jessica Gomez',
        email: 'jessica@growthstudio.co',
        subject: 'Inquiry about Custom Dashboard Development',
        message: 'Hello! Our agency needs a custom client reporting dashboard built with React, Node, and PostgreSQL. Loved your DevPulse project! Are you currently available for consulting?',
        isRead: true,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
      }
    ]
  });
  console.log('📬 Seeded sample initial contact messages.');

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
