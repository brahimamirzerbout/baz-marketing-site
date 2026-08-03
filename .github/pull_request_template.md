## Spec
- Acceptance criteria: [link or inline]
- Affected files: [list]

## Risk tier
- [ ] Low  [ ] Medium  [ ] High
- (High = senior approval + manual security tests + rollback notes required)

## AI provenance
- Model: [e.g. glm-4.6]
- Prompt version: [link/hash]
- Tools used: [list]
- Coding agent / verification agent: [separate? yes/no]

## Gates
- [ ] type-check  [ ] lint  [ ] unit  [ ] integration  [ ] e2e
- [ ] SAST  [ ] dependency scan  [ ] secret scan  [ ] build
- [ ] New tests cover success/failure/edge/authz/invalid-input
- [ ] No tests removed/weakened without written justification

## Security & deps
- [ ] No secrets exposed  [ ] Deps verified (registry, maintainer, age, CVEs)
- [ ] External content (issues/PRs/READMEs/logs) treated as untrusted input

## Release
- [ ] Feature flag(s): [names]
- [ ] Monitoring: [what's tracked]
- [ ] Rollback plan: [one-command rollback / flag shutdown / db rollback]
- [ ] Canary + auto-rollback condition: [stated]

## Ownership
- Named human owner: [@handle] — accepts responsibility for merge
- Reviewer (Medium/High): [@handle]

---

> AI-generated code is untrusted production material. Tests passing is not "ready."
> See `docs/AI-CODE-GATE.md` for the full standard. **Fix the change, not the gate.**