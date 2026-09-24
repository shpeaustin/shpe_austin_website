import { motion } from 'framer-motion';
import {
  Eye, FileDown, Contact, GraduationCap, Wrench, Sparkles,
  Calculator, Zap, FolderGit2, ScanLine, ListChecks,
  Download, ExternalLink, ArrowRight, FileText,
} from 'lucide-react';
import { Callout, TipList, DoDont, BeforeAfter, Chips, Formula } from '../../components/guide/slideBlocks';
import resumeTemplate from '../../assets/technical_resume_template.pdf';

const ACCENT = '#D33A02';
const GRADIENT = 'linear-gradient(135deg, #FD652F, #D33A02)';

const downloadButtonStyle = {
  display: 'inline-flex', alignItems: 'center', gap: 10,
  padding: '13px 24px', borderRadius: 13,
  background: GRADIENT, color: 'white', fontWeight: 900, fontSize: '0.87rem',
  textDecoration: 'none', boxShadow: '0 8px 24px rgba(253,101,47,0.32)',
};

/** inline preview of the template — falls back to a link where PDFs won't embed (iOS Safari) */
function TemplatePreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{
        width: '100%', maxWidth: 560, margin: '0 auto',
        aspectRatio: '8.5 / 11', borderRadius: 16, overflow: 'hidden',
        background: '#f1f5f9', border: '1px solid #e2e8f0',
        boxShadow: '0 10px 34px rgba(0,0,0,0.12)',
      }}>
        <object
          data={resumeTemplate}
          type="application/pdf"
          aria-label="SHPE Austin technical resume template preview"
          style={{ width: '100%', height: '100%', display: 'block', border: 'none' }}
        >
          <div style={{
            width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 14, padding: 24, textAlign: 'center',
          }}>
            <FileDown size={34} color={ACCENT} strokeWidth={1.8} />
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748b', lineHeight: 1.6 }}>
              Your browser can&apos;t preview PDFs inline.
            </p>
            <a
              href={resumeTemplate}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...downloadButtonStyle, padding: '11px 20px', fontSize: '0.82rem' }}
            >
              <ExternalLink size={15} />
              Open the template
            </a>
          </div>
        </object>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        <motion.a
          href={resumeTemplate}
          download
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={downloadButtonStyle}
        >
          <Download size={16} />
          Download the template
        </motion.a>
        <motion.a
          href={resumeTemplate}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 9,
            padding: '13px 24px', borderRadius: 13,
            background: 'white', border: '1px solid #e2e8f0',
            color: '#475569', fontWeight: 800, fontSize: '0.87rem', textDecoration: 'none',
          }}
        >
          <ExternalLink size={15} />
          Open full size
        </motion.a>
      </div>
    </div>
  );
}

// slides take goToGuide so the closing slide can hand people to another guide
export function buildResumeSlides({ goToGuide }) {
  return [
  {
    id: 'six-seconds',
    kicker: 'The reality',
    title: 'You get about six seconds',
    Icon: Eye,
    body: (
      <>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: '#475569' }}>
          A first pass on your resume is a skim, not a read. Recruiters scan in an F-pattern — across the top, then down the left edge of your bullets, catching the first three or four words of each one. Everything on this page follows from that.
        </p>
        <TipList
          accent={ACCENT}
          items={[
            <>Your strongest, most relevant material belongs in the <strong>top third</strong>. Don&apos;t bury the best thing you&apos;ve done on page one, line thirty.</>,
            <>The first few words of every bullet do the heavy lifting. Lead with the verb and the result, not with setup.</>,
            <>Consistent formatting isn&apos;t vanity — a ragged resume is slower to skim, and slower means skipped.</>,
            <>Most large employers screen with software before a human ever skims it. You have to pass both readers.</>,
          ]}
        />
        <Callout accent={ACCENT}>
          Write for the six-second skim first and the careful read second. If the skim works, you get the read.
        </Callout>
      </>
    ),
  },
  {
    id: 'template',
    kicker: 'Start here',
    title: 'Use our technical resume template',
    Icon: FileDown,
    body: (
      <>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: '#475569' }}>
          Don&apos;t design a resume from scratch and don&apos;t grab a pretty two-column template off the internet. This one is single-column and boring on purpose — that&apos;s what survives automated screening. It works for any engineering discipline or professional field; only the content changes.
        </p>
        <TemplatePreview />
        <TipList
          accent={ACCENT}
          items={[
            <>Section order for students and new grads: <strong>Header → Education → Experience → Projects → Skills</strong>.</>,
            <>Once you&apos;re a year or two out of school, move Education below Experience. What you&apos;ve shipped outranks where you studied.</>,
            <>Keep the single column. Keep the standard headings. Change the words, not the structure.</>,
          ]}
        />
      </>
    ),
  },
  {
    id: 'header',
    kicker: 'Section by section',
    title: 'The header',
    Icon: Contact,
    body: (
      <>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: '#475569' }}>
          Five lines at the top, and every one of them should be useful to someone trying to contact you or look you up.
        </p>
        <DoDont
          doLabel="Include"
          dontLabel="Leave off"
          dos={[
            'Full name, larger than everything else on the page.',
            'Phone, a professional email, and city + state.',
            'One professional profile link and, if your field has one, a portfolio or code repository — hyperlinked so they\'re clickable in the PDF.',
            'Your professional license or certification number, if your discipline uses one.',
          ]}
          donts={[
            'A photo. In the US this can get your resume tossed for compliance reasons.',
            'Your full mailing address. City and state is plenty.',
            '"References available upon request." Everyone knows. It\'s a wasted line.',
            'An email you made in ninth grade.',
          ]}
        />
        <Callout accent={ACCENT} label="Small thing, big signal">
          Make sure anything you link actually has something behind it. An empty profile or a dead portfolio link is worse than no link at all.
        </Callout>
      </>
    ),
  },
  {
    id: 'education-skills',
    kicker: 'Section by section',
    title: 'Education and skills',
    Icon: GraduationCap,
    body: (
      <>
        <TipList
          accent={ACCENT}
          items={[
            <>Degree, major, school, and <strong>expected</strong> graduation date if you haven&apos;t finished. Never leave a reader guessing whether you&apos;ve graduated.</>,
            <><strong>GPA:</strong> include it at 3.0 and above, leave it off below. Don&apos;t agonize — nobody rejects a resume for a missing GPA, and plenty of people filter on a low one.</>,
            <>Relevant coursework only if it earns its space — for a first internship it can, once you have real experience it can&apos;t.</>,
            <>Group your skills so they&apos;re scannable, and be honest about proficiency. <strong>Anything you list is fair game in the interview.</strong></>,
          ]}
        />
        <Chips
          accent={ACCENT}
          groups={[
            { label: 'Group them by kind — use the ones that fit your field', tags: ['Technical & Analysis', 'Software & Tools', 'Design & Modeling', 'Lab & Field Methods', 'Standards & Codes', 'Certifications & Licenses', 'Languages'] },
            { label: 'Leave these off', tags: ['Basic office software', 'Skill rating bars', '"Hard worker"', '"Team player"', '"Detail oriented"', 'Anything you\'d panic about being asked'] },
          ]}
        />
      </>
    ),
  },
  {
    id: 'bullet-formula',
    kicker: 'The most important slide',
    title: 'The bullet formula',
    Icon: Wrench,
    body: (
      <>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: '#475569' }}>
          Every strong bullet on a technical resume is the same four moves. Get this right and most of your resume fixes itself.
        </p>
        <Formula
          accent={ACCENT}
          parts={[
            { label: 'Action verb', detail: 'A strong one, in past tense. Built, automated, reduced, led.' },
            { label: 'What you did', detail: 'The specific thing — not the category of thing.' },
            { label: 'How / with what', detail: 'The method, tool, or scale. This is where your keywords live.' },
            { label: 'Quantified result', detail: 'The number that proves it mattered.' },
          ]}
        />
        <Callout accent={ACCENT} label="The test">
          A good bullet is readable in under five seconds and still gives measurable proof. If yours passes the first half and fails the second, you have a job description, not an accomplishment.
        </Callout>
        <DoDont
          doLabel="Start bullets like this"
          dontLabel="Never start a bullet with"
          dos={['"Automated…"', '"Reduced…"', '"Led a team of four to…"', '"Designed and shipped…"']}
          donts={['"Responsible for…"', '"Helped with…"', '"Worked on…"', '"Duties included…"', '"Assisted in…"']}
        />
      </>
    ),
  },
  {
    id: 'before-after',
    kicker: 'See it work',
    title: 'Before and after',
    Icon: Sparkles,
    body: (
      <>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: '#475569' }}>
          Same experience in every pair. The only thing that changed is the writing.
        </p>
        <BeforeAfter
          beforeLabel="Job description"
          afterLabel="Accomplishment"
          pairs={[
            {
              before: 'Responsible for quality testing.',
              after: 'Designed and ran a 40-sample stress test protocol on three housing materials, identifying a fatigue failure mode that pushed the team to a different alloy before tooling was ordered.',
              why: 'Verb + scope + method + consequence. Now they know what hiring you gets them.',
            },
            {
              before: 'Helped with a group project for my senior design class.',
              after: 'Led a 4-person senior design team building a water quality monitoring station; owned the sensor calibration and enclosure design, and delivered all six required specifications within a 10-week deadline.',
              why: 'Class projects count — write them exactly like a job.',
            },
            {
              before: 'Did data analysis for the lab.',
              after: 'Automated the lab\'s weekly sensor data workflow, replacing a 3-hour manual spreadsheet process with a 5-minute scripted report now used by all four research groups.',
              why: 'The adoption — "used by all four research groups" — does the work when there\'s no clean percentage available.',
            },
            {
              before: 'Worked on cost reduction.',
              after: 'Analyzed vendor pricing across 22 recurring components and consolidated to three suppliers, reducing unit cost 11% and cutting purchase orders processed per month from 45 to 12.',
              why: 'Two numbers from two different angles. Cost and effort are both real impact.',
            },
            {
              before: 'Member of SHPE.',
              after: 'Coordinated 6 professional development events for 120+ SHPE Austin members, growing average attendance 45% year over year through targeted outreach to three local universities.',
              why: 'Leadership in an org is real project management. Do not waste it on a one-line membership mention.',
            },
          ]}
        />
      </>
    ),
  },
  {
    id: 'find-numbers',
    kicker: 'The hard part',
    title: '"But I don\'t have any numbers"',
    Icon: Calculator,
    body: (
      <>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: '#475569' }}>
          This is almost always false. You have numbers — you just haven&apos;t looked for them yet. Run each bullet through these four prompts.
        </p>
        <Formula
          accent={ACCENT}
          parts={[
            { label: 'How many?', detail: 'People, parts, samples, sites, tests, records, events, drawings, accounts.' },
            { label: 'How much faster or cheaper?', detail: 'Hours saved per week, steps removed, material cost, downtime avoided.' },
            { label: 'By what percent?', detail: 'Compare before and after. Even a rough before is a before.' },
            { label: 'At what scale?', detail: 'Team size, budget, square footage, throughput, semesters running.' },
          ]}
        />
        <TipList
          accent={ACCENT}
          items={[
            <>A reasonable estimate is fine — just be ready to explain the math, because you will be asked.</>,
            <>Genuinely no number? Use <strong>adoption</strong> instead: &ldquo;still the process the team uses,&rdquo; &ldquo;adopted by two other groups,&rdquo; &ldquo;presented to 40 faculty and students.&rdquo;</>,
            <>Start tracking now. Screenshot your dashboards, note your before-and-after timings, save the attendance counts. Future you will be grateful.</>,
          ]}
        />
      </>
    ),
  },
  {
    id: 'verbs',
    kicker: 'Toolkit',
    title: 'Action verbs, by what you\'re proving',
    Icon: Zap,
    body: (
      <>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: '#475569' }}>
          Pick the verb that matches the claim you&apos;re making. And vary them — six bullets starting with &ldquo;Developed&rdquo; reads as one bullet repeated six times.
        </p>
        <Chips
          accent={ACCENT}
          groups={[
            { label: 'You built something', tags: ['Engineered', 'Designed', 'Implemented', 'Developed', 'Automated', 'Fabricated', 'Prototyped', 'Integrated', 'Commissioned'] },
            { label: 'You made something better', tags: ['Optimized', 'Reduced', 'Streamlined', 'Redesigned', 'Accelerated', 'Scaled', 'Standardized', 'Improved'] },
            { label: 'You led or organized', tags: ['Led', 'Coordinated', 'Mentored', 'Directed', 'Facilitated', 'Spearheaded', 'Trained'] },
            { label: 'You figured something out', tags: ['Analyzed', 'Evaluated', 'Diagnosed', 'Modeled', 'Benchmarked', 'Validated', 'Investigated'] },
          ]}
        />
        <Callout accent={ACCENT} label="Tense">
          Past tense for everything you&apos;ve finished, present tense only for the job you&apos;re currently in. Be consistent within each role — mixed tenses are the most common formatting mistake we see.
        </Callout>
      </>
    ),
  },
  {
    id: 'projects',
    kicker: 'No internship yet?',
    title: 'Projects are real experience',
    Icon: FolderGit2,
    body: (
      <>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: '#475569' }}>
          A strong Projects section is a legitimate substitute for work experience, and plenty of people get their first internship on the strength of one. Treat each project exactly like a job.
        </p>
        <TipList
          accent={ACCENT}
          items={[
            <>Same bullet formula, same metrics, same strong verbs. A project entry should be indistinguishable in quality from a job entry.</>,
            <>Give it a real name, a one-line description of what it does, and the stack. Then two or three impact bullets.</>,
            <><strong>Link the proof</strong> where your field has one — a repository, a portfolio, a report, a drawing set, a demo video. Make sure it explains what the thing is to someone seeing it cold.</>,
            <>Two or three substantial projects beat six thin ones. The assignment every student in your program completed is not a differentiator.</>,
            <>All of these count: senior design, research, competition teams, design challenges, personal builds, freelance work, and org leadership.</>,
          ]}
        />
        <Callout accent={ACCENT} label="What makes a project land">
          Someone used it, or it solved a real problem you can describe. &ldquo;I built this because our chapter was tracking event check-ins on paper&rdquo; is a better opening than any list of tools.
        </Callout>
      </>
    ),
  },
  {
    id: 'ats',
    kicker: 'The robot reader',
    title: 'Surviving the ATS',
    Icon: ScanLine,
    body: (
      <>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: '#475569' }}>
          The large majority of big employers screen applications with an applicant tracking system, and a lot of candidates get filtered out before a person ever looks. Most of the time it&apos;s formatting, not qualifications.
        </p>
        <DoDont
          doLabel="ATS-safe"
          dontLabel="Gets you parsed wrong"
          dos={[
            'Single column, standard fonts, plain bullet characters.',
            'Standard headings: "Experience", "Education", "Skills", "Projects".',
            'Submit as PDF unless the posting asks for .docx.',
            'Mirror the posting\'s actual wording — if it names a specific standard, method, or tool, use their exact term where it honestly applies to you.',
          ]}
          donts={[
            'Tables, text boxes, or multi-column layouts. Parsers scramble them.',
            'Anything critical in the header or footer — many parsers never read those.',
            'Graphics, icons, logos, or skill-rating bars.',
            'Creative headings like "Where I\'ve Been" or "My Toolkit".',
          ]}
        />
        <Callout accent={ACCENT} label="Length">
          Early career, <strong>one page</strong> — no exceptions worth arguing about. Once you have several years and genuine depth to show, two pages is normal for technical roles and beats cramming. Don&apos;t pad to fill page two.
        </Callout>
      </>
    ),
  },
  {
    id: 'tailor',
    kicker: 'Finish',
    title: 'Tailor it in 10 minutes, then check it',
    Icon: ListChecks,
    body: (
      <>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: '#475569' }}>
          One generic resume sent to forty companies loses to one tailored resume sent to ten. Tailoring does not mean rewriting — it means ten minutes of reordering.
        </p>
        <Formula
          accent={ACCENT}
          parts={[
            { label: 'Pull the terms', detail: 'Read the posting and list the 8–10 words that keep coming back.' },
            { label: 'Reorder', detail: 'Move the bullets that match to the top of each role.' },
            { label: 'Swap the lead', detail: 'Put the skills they named first in your Skills section.' },
            { label: 'Match the language', detail: 'Use their exact terms where they honestly apply to you.' },
          ]}
        />
        <TipList
          accent={ACCENT}
          items={[
            <><strong>Final check:</strong> consistent tense, consistent punctuation (periods on all bullets or none), no first person, no orphaned single-word lines.</>,
            <>Zero typos — especially in the names of the tools, standards, and methods in your own field. Misspelling your own specialty ends applications.</>,
            <>Read it once from the bottom up. It breaks the reading rhythm and you&apos;ll catch things you&apos;ve gone blind to.</>,
            <>Save as <strong>FirstLast_Resume.pdf</strong>. Not &ldquo;resume_final_v3_REAL.pdf&rdquo;.</>,
            <>Have one other person read it. You cannot proofread your own resume — you know what it&apos;s supposed to say.</>,
          ]}
        />
        <Callout accent={ACCENT} label="Bring it to us">
          SHPE Austin runs resume reviews at our professional development events. Bring a printed copy and get real feedback from professionals who do the hiring.
        </Callout>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap', paddingTop: 4 }}
        >
          <button
            type="button"
            onClick={() => goToGuide('interview')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              padding: '13px 24px', borderRadius: 13, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #001F5B 0%, #0070C0 100%)',
              color: 'white', fontWeight: 900, fontSize: '0.87rem',
              boxShadow: '0 8px 24px rgba(0,112,192,0.3)',
            }}
          >
            Mastering the Interview
            <ArrowRight size={16} />
          </button>
          <a
            href={resumeTemplate}
            download
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              padding: '13px 24px', borderRadius: 13,
              background: 'white', border: '1px solid #e2e8f0',
              color: '#475569', fontWeight: 800, fontSize: '0.87rem', textDecoration: 'none',
            }}
          >
            <Download size={15} />
            Get the template
          </a>
        </motion.div>
      </>
    ),
  },
];
}

export { resumeTemplate };

export const resumeGuide = {
  id: 'resume',
  Icon: FileText,
  title: 'Refining Your Resume',
  eyebrow: '11 slides · ~8 min · free template',
  blurb: 'A bullet formula that actually proves impact, real before-and-after rewrites, how to get past an ATS, and our resume template to start from.',
  highlights: ['Downloadable template', 'Before & after bullets', 'ATS formatting rules'],
  accent: ACCENT,
  gradient: GRADIENT,
  buildSlides: buildResumeSlides,
};
