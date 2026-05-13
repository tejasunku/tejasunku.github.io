---
name: skill-creation
description: |
  Creates Agent Skills following the agentskills.io specification. Use when:
  - Asked to create a new skill
  - Need to set up a skill directory structure
  - Writing SKILL.md with frontmatter (name, description, license, compatibility, metadata, allowed-tools)
  - Structuring skills with scripts/, references/, and assets/ directories
  - Validating skill format with skills-ref
  - Understanding progressive disclosure (metadata, instructions, resources)
license: CC0-1.0
---

# Skill Creation Guide

Creates Agent Skills following the agentskills.io specification.

## Quick Start

1. Create a skill directory: `skill-name/`
2. Create `SKILL.md` with frontmatter
3. Add optional `scripts/`, `references/`, and `assets/` directories
4. Validate with `skills-ref validate ./skill-name`

## SKILL.md Structure

```yaml
---
name: skill-name
description: What this skill does and when to use it (1-1024 chars)
license: License name (optional)
compatibility: Environment requirements (optional)
metadata:
  key: value (optional)
---

# Markdown instructions here
```

## Required Frontmatter

**name**
- 1-64 characters, lowercase letters and hyphens only
- Must not start/end with hyphen, no consecutive hyphens
- Must match the parent directory name

**description**
- 1-1024 characters
- Describe what AND when to use
- Include keywords for agent discovery

## Optional Directories

- `scripts/` - Executable code (Python, Bash, JavaScript)
- `references/` - Documentation files (REFERENCE.md, domain-specific docs)
- `assets/` - Templates, images, data files

## Validation

```bash
npx skills-ref validate ./skill-name
```

See [references/specification.md](references/specification.md) for the complete specification.