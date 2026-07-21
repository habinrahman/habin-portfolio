# Habin Rahman — Portfolio

Personal portfolio site for Habin Rahman, Backend & AI Systems Engineer. Built with React, TypeScript, and Vite.

**Live**: https://habin-portfolio.vercel.app

## What this is

A single-page portfolio: hero, verified proof (a real, publicly checkable certificate verification endpoint), featured projects, engineering stack, certifications, and contact — sourced from a real GitHub account and real shipped systems, not placeholder content.

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- Deployed on Vercel

## Content model

All copy, nav, project data, and section content live in one place:

- `src/config/portfolio.config.ts` — site-wide copy, nav, section text
- `src/config/portfolio.projects.build.ts` — project entries (source of truth for featured + "more projects" listings)

Editing either file is the correct way to update site content — sections read from these configs rather than hardcoding text.

## Local development

```bash
npm install
npm run dev       # start dev server
npm run build     # type-check (tsc -b) + production build
npm run lint       # eslint
```

## Project structure

```
src/
  components/   # shared UI (command palette, etc.)
  sections/     # homepage sections (Hero, Projects, VerifiedProof, ...)
  pages/        # route-level pages
  config/       # portfolio content — copy + project data
  data/         # shared types
```
