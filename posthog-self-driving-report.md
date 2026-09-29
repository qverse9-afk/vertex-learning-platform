# PostHog Self-driving setup report

## Summary

PostHog Self-driving is configured for Vertex. Session Replay, Error Tracking, and Support are enabled; health, error, and support signal sources are enabled; the scout troop and two Replay Vision monitors are active. Findings will start appearing in the [Self-driving inbox](https://us.posthog.com/project/619245/inbox) within about 30 minutes as recordings and product activity arrive.

Repository changes: created this report only (`posthog-self-driving-report.md`). All Self-driving, source, scout, and scanner configuration changes were made server-side in PostHog; no application source files were changed.

## AI data processing

Approved.

## GitHub

Connected before this setup run through the PostHog GitHub App. GitHub Issues was not selected as a connected-tool responder, so no GitHub Issues source was enabled.

## Products enabled

| Product | Result | Notes |
| --- | --- | --- |
| Session Replay | enabled | Web SDK init is present and does not disable recording. The browser public token and host are configured. |
| Error Tracking | enabled | Web SDK init explicitly enables exception capture. |
| Support (Conversations) | enabled | Tickets will begin flowing only after an inbound email, inbox, or Slack channel is connected in PostHog. |

## Signal sources

| Signal source | Action | Notes |
| --- | --- | --- |
| `health_checks` / `health_issue` | enabled | Source config `01a0eab5-b01e-7353-b1d6-248940ec3c71`. |
| `error_tracking` / `issue_created` | enabled | Source config `01a0eab5-b0c2-76c5-b348-67fa8f2cbe41`. |
| `error_tracking` / `issue_reopened` | enabled | Source config `01a0eab5-afd5-73c3-870b-a436c1f8f8a8`. |
| `error_tracking` / `issue_spiking` | enabled | Source config `01a0eab5-b0d4-7025-aea1-0a846394a1c8`. |
| `conversations` / `ticket` | enabled | Source config `01a0eab5-afd2-7073-8747-ddb0be7d3e04`; remains idle until a Support channel is connected. |
| `signals_scout` / `cross_source_issue` | on by default | No opt-out row existed; scout findings can reach the inbox. |
| Session replay responder row | deliberately skipped | Replay coverage is supplied by the two Replay Vision scanners below; the retired session-analysis source was not created. |
| `replay_vision` responder row | deliberately skipped | Scanner `emits_signals: true` is the source configuration. |

## Connected tools

No connected-tool responder was selected. GitHub Issues, Linear, Jira, Sentry, Zendesk, and the remaining optional connected tools are **not used** by this setup.

## Scout troop

**Verified budget:** 100 runs/day, 0 used today, 100 remaining. The early-access banner says: “Scouts are in early access. Each project gets up to 100 scout runs a day. Contact team-self-driving@posthog.com if you need more.”

Seven scouts are active, well below the ten-scout quality ceiling:

| Active scout | What it watches |
| --- | --- |
| `signals-scout-general` | Cross-product patterns and surfaces without a dedicated specialist. |
| `signals-scout-anomaly-detection` | Trend breaks in saved dashboards and insights. |
| `signals-scout-product-analytics` | Engagement, conversion, retention, and learning-flow regressions. |
| `signals-scout-web-analytics` | Acquisition, landing-page, and web-traffic health. |
| `signals-scout-web-vitals` | Frontend Core Web Vitals regressions. |
| `signals-scout-course-exploration-handoff` | Course module exploration that no longer leads to continuing learning. |
| `signals-scout-learning-resume-engagement` | Liveness and balance of the two course-resume entry points. |

The remaining 22 built-in scouts are disabled to keep recurring checks focused: AI observability, APM, conversations, CSP violations, customer analytics, data pipelines, data warehouse, experiments, feature flags, insight alerts, logs, MCP tool calls, observability gaps, PR follow-up, revenue analytics, skills store, surveys, and tasks have no active evidence in this project; inbox validation has no resolved fixes to validate yet; replay vision has no accumulated observations yet. Error tracking is covered by its native source and session replay is covered by the Replay Vision monitors, so their built-in scouts remain disabled to avoid duplicate reports.

## Custom scouts

| Custom scout | Surface and discriminator | Why it is separate |
| --- | --- | --- |
| `signals-scout-course-exploration-handoff` | Alerts on a sustained decline from expanded course-module exploration to continuing learning while exploration volume stays stable. | The built-in product-analytics scout is broad and centered on saved flows; this owns the Vertex course-detail handoff implemented by `CourseContent` and `CourseActions`. |
| `signals-scout-learning-resume-engagement` | Alerts when a resume path goes quiet or the course-action/progress-bar split changes sharply while related course engagement remains stable. | Generic conversion monitoring may not fire for one entry point silently degrading; this watches the two resume controls in `CourseActions` and `CourseProgress`. |

No additional candidates were proposed. Generic errors and replay issues were ruled out because their dedicated native and scanner routes already cover them. If either custom scout becomes noisy, set its config’s `emit` field to `false` in PostHog to keep it running in dry-run mode.

## Replay Vision scanners

A scanner is an LLM that watches individual session recordings on a schedule and pushes validated findings to the inbox. Replay Vision scanners are the only part of this setup that spends Replay Vision quota. Their findings arrive at half weight and need independent corroboration before promotion into a report.

| Scanner | Status | Scope and purpose | Sampling | Estimated monthly spend |
| --- | --- | --- | --- | --- |
| **Course learning breakage** | created | URL scope contains `/courses/`, the course detail and course-content flow where learners inspect modules and continue learning. Watches visible loading failures, broken module expansion, unresponsive course actions, and missing progress UI. | 50% | 0 observations / 0 credits (no recordings in the seven-day estimate window) |
| **Learning journey frustration** | created | Sessions containing `$rageclick` only. Watches visible frustration while choosing courses, managing modules, using course actions, or signing in/up. | 100% | 0 observations / 0 credits (no recordings in the seven-day estimate window) |

The organization has 2,500 Replay Vision credits remaining and is not exhausted. There were no recordings at setup time, so both scanners are armed and begin working as soon as recordings arrive. Rate observations thumbs-up or thumbs-down in each scanner’s Replay Vision page once data arrives to receive configuration recommendations.

## Follow-ups

- [ ] Connect an inbound Support channel (email, inbox, or Slack) in PostHog so the enabled Support ticket source receives tickets.
- [ ] Generate real browser traffic and confirm Session Replay recordings arrive; both Replay Vision monitors are already armed but currently have no recordings to scan.

## What happens next

The scout coordinator picks up fresh configurations within about 30 minutes. Scouts draw from the verified daily run budget, findings cluster into reports in the [Self-driving inbox](https://us.posthog.com/project/619245/inbox), and immediately actionable reports can start coding tasks.
