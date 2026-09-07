import { defineConfig } from 'vitepress'

const architecture = [
  { text: '1. Introduction and Goals', link: '/arc42/01-introduction-goals/' },
  { text: '2. Constraints', link: '/arc42/02-constraints/' },
  { text: '3. Context and Scope', link: '/arc42/03-context-scope/' },
  { text: '4. Solution Strategy', link: '/arc42/04-solution-strategy/' },
  { text: '5. Building Block View', link: '/arc42/05-building-block-view/' },
  { text: '6. Runtime View', link: '/arc42/06-runtime-view/' },
  { text: '7. Deployment View', link: '/arc42/07-deployment-view/' },
  { text: '8. Crosscutting Concepts', link: '/arc42/08-crosscutting-concepts/' },
  { text: '9. Architecture Decisions', link: '/arc42/09-architecture-decisions/' },
  { text: '10. Quality Requirements', link: '/arc42/10-quality-requirements/' },
  { text: '11. Risks and Technical Debt', link: '/arc42/11-risks-technical-debt/' },
  { text: '12. Glossary', link: '/arc42/12-glossary/' }
]

const decisions = [
  { text: '0001. Use Established Core Technologies', link: '/adr/0001-use-established-core-implementation-technologies/' },
  { text: '0002. Store Screenshots and Downloads', link: '/adr/0002-store-screenshots-and-downloads/' },
  { text: '0003. Use OpenAPI as API Contract', link: '/adr/0003-use-openapi-as-api-contract/' },
  { text: '0004. Use MySQL and Liquibase', link: '/adr/0004-use-mysql-and-liquibase/' },
  { text: '0005. Use Docker Compose', link: '/adr/0005-use-docker-compose-for-local-orchestration/' },
  { text: '0006. Use Keycloak', link: '/adr/0006-use-keycloak-for-local-oauth2-scenarios/' },
  { text: '0007. Use MkDocs Material', link: '/adr/0007-use-mkdocs-material-arc42-and-adrs/' },
  { text: '0008. Build Trails Scout as Extension', link: '/adr/0008-build-trails-scout-as-browser-extension/' },
  { text: '0009. Use Spring Boot', link: '/adr/0009-use-spring-boot-for-backend-service/' },
  { text: '0010. Use Angular', link: '/adr/0010-use-angular-for-frontend/' },
  { text: '0011. Use Selenium Grid', link: '/adr/0011-use-selenium-grid-for-browser-automation/' },
  { text: '0012. Use VitePress', link: '/adr/0012-use-vitepress-for-documentation/' }
]

const development = [
  { text: 'Overview', link: '/dev-guide/' },
  { text: 'Trails Service', link: '/dev-guide/trails-service/' },
  { text: 'Trails Frontend', link: '/dev-guide/trails-frontend/' },
  { text: 'Trails Scout', link: '/dev-guide/trails-scout/' },
  { text: 'Trails Docs', link: '/dev-guide/trails-docs/' }
]

export default defineConfig({
  title: 'Trails Documentation',
  description: 'Architecture documentation for Trails browser-driven test workflows.',
  lang: 'en-US',
  base: '/',
  cleanUrls: true,
  outDir: '../site',
  sitemap: {
    hostname: 'https://docs.trailstestplatform.org/'
  },
  rewrites: {
    'repositories.md': 'repositories/index.md',
    'arc42/01-introduction-goals.md': 'arc42/01-introduction-goals/index.md',
    'arc42/02-constraints.md': 'arc42/02-constraints/index.md',
    'arc42/03-context-scope.md': 'arc42/03-context-scope/index.md',
    'arc42/04-solution-strategy.md': 'arc42/04-solution-strategy/index.md',
    'arc42/05-building-block-view.md': 'arc42/05-building-block-view/index.md',
    'arc42/06-runtime-view.md': 'arc42/06-runtime-view/index.md',
    'arc42/07-deployment-view.md': 'arc42/07-deployment-view/index.md',
    'arc42/08-crosscutting-concepts.md': 'arc42/08-crosscutting-concepts/index.md',
    'arc42/09-architecture-decisions.md': 'arc42/09-architecture-decisions/index.md',
    'arc42/10-quality-requirements.md': 'arc42/10-quality-requirements/index.md',
    'arc42/11-risks-technical-debt.md': 'arc42/11-risks-technical-debt/index.md',
    'arc42/12-glossary.md': 'arc42/12-glossary/index.md',
    'adr/0001-use-established-core-implementation-technologies.md': 'adr/0001-use-established-core-implementation-technologies/index.md',
    'adr/0002-store-screenshots-and-downloads.md': 'adr/0002-store-screenshots-and-downloads/index.md',
    'adr/0003-use-openapi-as-api-contract.md': 'adr/0003-use-openapi-as-api-contract/index.md',
    'adr/0004-use-mysql-and-liquibase.md': 'adr/0004-use-mysql-and-liquibase/index.md',
    'adr/0005-use-docker-compose-for-local-orchestration.md': 'adr/0005-use-docker-compose-for-local-orchestration/index.md',
    'adr/0006-use-keycloak-for-local-oauth2-scenarios.md': 'adr/0006-use-keycloak-for-local-oauth2-scenarios/index.md',
    'adr/0007-use-mkdocs-material-arc42-and-adrs.md': 'adr/0007-use-mkdocs-material-arc42-and-adrs/index.md',
    'adr/0008-build-trails-scout-as-browser-extension.md': 'adr/0008-build-trails-scout-as-browser-extension/index.md',
    'adr/0009-use-spring-boot-for-backend-service.md': 'adr/0009-use-spring-boot-for-backend-service/index.md',
    'adr/0010-use-angular-for-frontend.md': 'adr/0010-use-angular-for-frontend/index.md',
    'adr/0011-use-selenium-grid-for-browser-automation.md': 'adr/0011-use-selenium-grid-for-browser-automation/index.md',
    'adr/0012-use-vitepress-for-documentation.md': 'adr/0012-use-vitepress-for-documentation/index.md',
    'dev-guide/trails-service.md': 'dev-guide/trails-service/index.md',
    'dev-guide/trails-frontend.md': 'dev-guide/trails-frontend/index.md',
    'dev-guide/trails-scout.md': 'dev-guide/trails-scout/index.md',
    'dev-guide/trails-docs.md': 'dev-guide/trails-docs/index.md'
  },
  themeConfig: {
    siteTitle: 'Trails Docs',
    nav: [
      { text: 'Architecture', link: '/arc42/01-introduction-goals/' },
      { text: 'ADRs', link: '/adr/0001-use-established-core-implementation-technologies/' },
      { text: 'Dev Guide', link: '/dev-guide/' },
      { text: 'Repositories', link: '/repositories/' }
    ],
    sidebar: [
      { text: 'Architecture', items: architecture },
      { text: 'ADRs', items: decisions },
      { text: 'Dev Guide', items: development }
    ],
    search: {
      provider: 'local'
    },
    outline: {
      level: [2, 3],
      label: 'On this page'
    },
    docFooter: {
      prev: 'Previous page',
      next: 'Next page'
    },
    socialLinks: [
      { icon: 'github', link: 'https://codeberg.org/yaforster/trails-docs' }
    ],
    footer: {
      message: 'Trails architecture documentation',
      copyright: 'Copyright © Trails'
    }
  }
})
