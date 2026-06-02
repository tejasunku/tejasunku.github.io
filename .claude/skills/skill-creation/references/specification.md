# Agent Skills Specification

Source: https://agentskills.io/specification

The complete format specification for Agent Skills.

## Directory Structure

A skill is a directory containing, at minimum, a `SKILL.md` file:

```
skill-name/
├── SKILL.md          # Required: metadata + instructions
├── scripts/          # Optional: executable code
├── references/       # Optional: documentation
├── assets/           # Optional: templates, resources
└── ...               # Any additional files or directories
```

## SKILL.md Format

The `SKILL.md` file must contain YAML frontmatter followed by Markdown content.

## Frontmatter Fields

### Required Fields

**`name`**
- Must be 1-64 characters
- May only contain unicode lowercase alphanumeric characters (`a-z`) and hyphens (`-`)
- Must not start or end with a hyphen (`-`)
- Must not contain consecutive hyphens (`--`)
- Must match the parent directory name

**`description`**
- Must be 1-1024 characters
- Should describe both what the skill does AND when to use it
- Should include specific keywords that help agents identify relevant tasks

### Optional Fields

**`license`** - License name or reference to a bundled license file

**`compatibility`** - Environment requirements (intended product, system packages, network access, etc.)

**`metadata`** - Arbitrary key-value mapping for additional metadata

**`allowed-tools`** - Space-separated string of pre-approved tools (Experimental)

## Body Content

The Markdown body after the frontmatter contains the skill instructions. Recommended sections:
- Step-by-step instructions
- Examples of inputs and outputs
- Common edge cases

Keep the main `SKILL.md` under 500 lines. Move detailed reference material to separate files.

## Optional Directories

### `scripts/`
Contains executable code that agents can run. Scripts should:
- Be self-contained or clearly document dependencies
- Include helpful error messages
- Handle edge cases gracefully

### `references/`
Contains additional documentation that agents can read when needed:
- `REFERENCE.md` - Detailed technical reference
- `FORMS.md` - Form templates or structured data formats
- Domain-specific files (`finance.md`, `legal.md`, etc.)

Keep individual reference files focused. Agents load these on demand.

### `assets/`
Contains static resources:
- Templates (document templates, configuration templates)
- Images (diagrams, examples)
- Data files (lookup tables, schemas)

## Progressive Disclosure

Agents load skills progressively:
1. **Metadata (~100 tokens)**: The `name` and `description` fields are loaded at startup for all skills
2. **Instructions (< 5000 tokens recommended)**: The full `SKILL.md` body is loaded when the skill is activated
3. **Resources (as needed)**: Files in `scripts/`, `references/`, or `assets/` are loaded only when required

## File References

When referencing other files in your skill, use relative paths from the skill root:

```markdown
See [the reference guide](references/REFERENCE.md) for details.

Run the extraction script:
scripts/extract.py
```

Keep file references one level deep from `SKILL.md`. Avoid deeply nested reference chains.

## Validation

Use the [skills-ref](https://github.com/agentskills/agentskills/tree/main/skills-ref) reference library to validate your skills:

```bash
skills-ref validate ./my-skill
```

This checks that your `SKILL.md` frontmatter is valid and follows all naming conventions.
