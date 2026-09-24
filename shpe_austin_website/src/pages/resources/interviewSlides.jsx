import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, Mic, Star, User, Library, Sparkles, TrendingUp,
  Code2, FileText, HelpCircle, Send, ArrowRight, MessageSquareQuote,
} from 'lucide-react';
import { Callout, TipList, DoDont, BeforeAfter, Chips, StarDiagram } from '../../components/guide/slideBlocks';

const ACCENT = '#0070C0';
const GRADIENT = 'linear-gradient(135deg, #001F5B 0%, #0070C0 100%)';

// slides take goToGuide so the closing slide can hand people to another guide
export function buildInterviewSlides({ goToGuide }) {
  return [
  {
    id: 'prep',
    kicker: 'Before the interview',
    title: 'Do the homework they can tell you did',
    Icon: Search,
    body: (
      <>
        <TipList
          accent={ACCENT}
          items={[
            <>Read the job description twice, then write each requirement in one column and something you&apos;ve actually done next to it. The gaps tell you what to prepare for.</>,
            <>Have <strong>three specific talking points</strong> ready about the company: a product you&apos;ve used, something they announced recently, a value that genuinely resonates. &ldquo;I like your mission&rdquo; is not one of them.</>,
            <>Look up who you&apos;re meeting. Their title tells you what they&apos;ll care about — a hiring manager asks different questions than a peer engineer.</>,
            <>Confirm the logistics the day before: format, length, whether there&apos;s a technical exercise, the meeting link or the address, and a backup phone number.</>,
            <>Have your resume open in front of you and a glass of water within reach. Test your camera and mic on the actual platform, not a different one.</>,
          ]}
        />
        <Callout accent={ACCENT}>
          Preparation is the part of the interview you fully control. Walk in having already decided what your best three stories are.
        </Callout>
      </>
    ),
  },
  {
    id: 'pitch',
    kicker: 'The opener',
    title: 'Your 90-second pitch',
    Icon: Mic,
    body: (
      <>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: '#475569' }}>
          &ldquo;Tell me about yourself&rdquo; is not a request for your life story. It&apos;s an audition for how clearly you communicate. Use a three-beat structure and keep it to about <strong>90 seconds</strong>.
        </p>
        <TipList
          accent={ACCENT}
          items={[
            <><strong>Present</strong> — who you are right now, in one line. &ldquo;I&apos;m a senior in mechanical engineering, focused on controls systems.&rdquo;</>,
            <><strong>Past</strong> — the one or two experiences that got you here and that matter for <em>this</em> role. Not everything on your resume. Two things.</>,
            <><strong>Why here</strong> — why this role, this company, now. This is where the homework from the last slide pays off.</>,
          ]}
        />
        <DoDont
          dos={[
            'Practice it out loud until it flows, then stop.',
            'End on why you\'re sitting in this specific interview.',
            'Leave hooks — mention a project you want them to ask about.',
          ]}
          donts={[
            'Memorize it word for word. It will sound memorized.',
            'Start with where you were born or your high school.',
            'Narrate your resume chronologically for four minutes.',
          ]}
        />
      </>
    ),
  },
  {
    id: 'star',
    kicker: 'The core skill',
    title: 'The STAR method',
    Icon: Star,
    body: (
      <>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: '#475569' }}>
          Almost every &ldquo;tell me about a time when…&rdquo; question is answered the same way. STAR gives you a structure so you never ramble and never forget the ending.
        </p>
        <StarDiagram accent={ACCENT} />
        <Callout accent={ACCENT} label="Timing">
          A strong STAR answer runs <strong>60 to 90 seconds</strong> — two minutes at the outside. A five-minute answer tells the interviewer you can&apos;t communicate concisely, which is itself a data point about working with you.
        </Callout>
      </>
    ),
  },
  {
    id: 'i-not-we',
    kicker: 'The most common mistake',
    title: 'Say "I", not "we"',
    Icon: User,
    body: (
      <>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: '#475569' }}>
          They are not hiring your old team. When you narrate in &ldquo;we,&rdquo; the interviewer genuinely cannot tell what you did — and they will assume the smaller version. Credit the team once, then talk about your own decisions.
        </p>
        <BeforeAfter
          beforeLabel="Invisible"
          afterLabel="Clear ownership"
          pairs={[
            {
              before: '"We redesigned the assembly line layout and it went pretty well."',
              after: '"The team redesigned the line. I owned the material flow analysis — I mapped the existing travel distances, modeled three alternative layouts, and presented the option we ended up building."',
              why: 'Same project, same team, but now they know exactly what you can be trusted with.',
            },
            {
              before: '"We had a problem on site so we fixed it."',
              after: '"I got the call at 6am about the failed pour. I inspected the forms, traced the failure to an under-braced section, wrote the corrective procedure that afternoon, and walked the crew through it the next morning."',
              why: 'Specific verbs — inspected, traced, wrote, walked through — are what make ownership believable.',
            },
          ]}
        />
      </>
    ),
  },
  {
    id: 'story-bank',
    kicker: 'Preparation strategy',
    title: 'Build a story bank, not a script',
    Icon: Library,
    body: (
      <>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: '#475569' }}>
          You cannot memorize an answer for every question. You can prepare <strong>three to five flexible stories</strong> and re-angle them on the fly. That&apos;s what experienced candidates are actually doing.
        </p>
        <Chips
          accent={ACCENT}
          groups={[
            { label: 'Cover these five situations', tags: ['A conflict or disagreement', 'A failure you owned', 'Leading without authority', 'Working through ambiguity', 'A brutal deadline'] },
            { label: 'One story can answer all of these', tags: ['Tell me about a challenge', 'A time you influenced someone', 'How do you handle pressure', 'A time you took initiative', 'Your proudest project'] },
          ]}
        />
        <Callout accent={ACCENT} label="You have more material than you think">
          Class projects, senior design, research, competition and design teams, volunteering, part-time jobs, and SHPE leadership all count. Employers evaluating early-career candidates explicitly look at experiential learning and extracurriculars. Running an event for 120 people <em>is</em> project management.
        </Callout>
      </>
    ),
  },
  {
    id: 'star-example',
    kicker: 'Worked example',
    title: 'The same story, told badly and told well',
    Icon: Sparkles,
    body: (
      <>
        <BeforeAfter
          beforeLabel="Rambling — no task, no result"
          afterLabel="STAR — 75 seconds"
          pairs={[
            {
              before: '"So in my senior design class we were building this monitoring system and honestly it was kind of a mess, people weren\'t showing up to meetings, and there was a lot of back and forth about which controller to use. Eventually we figured it out and it worked okay at the showcase. I learned a lot about teamwork."',
              after: '"On my senior design team, we were three weeks from the showcase and still deadlocked on which controller to build around — two people wanted one option, two wanted the other. [Situation] As the team lead, my job was to get us unblocked without anyone feeling steamrolled. [Task] I built a one-page comparison against our four hard requirements — power budget, wireless range, documentation quality, and what we already had in the lab — and ran a 20-minute meeting where we scored each option against those criteria instead of arguing preferences. One option won on three of four. I also wrote down the single thing we\'d be giving up, so nobody felt dismissed. [Action] We locked the decision that day, finished integration with five days to spare, and placed second at the showcase. I still use that trick — argue about the criteria, not the options." [Result]',
              why: 'Same events. The second one tells them you can lead, decide, and communicate. Notice how much of it is the Action.',
            },
          ]}
        />
        <Callout accent={ACCENT}>
          You don&apos;t say &ldquo;Situation&rdquo; and &ldquo;Task&rdquo; out loud — the brackets are just showing you the skeleton. Practiced well, STAR sounds like a person telling a good story.
        </Callout>
      </>
    ),
  },
  {
    id: 'result',
    kicker: 'The ending',
    title: 'Land the result',
    Icon: TrendingUp,
    body: (
      <>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: '#475569' }}>
          The ending is what they write down. Most candidates trail off right when they should be closing hard.
        </p>
        <TipList
          accent={ACCENT}
          items={[
            <>Reach for a number first: a percentage, hours saved, users affected, bugs caught, dollars, scale.</>,
            <>No number available? Use an <strong>adopted outcome</strong> — &ldquo;that runbook is still what the team uses,&rdquo; &ldquo;they kept the process after I left.&rdquo;</>,
            <>Add one line of what you learned or would do differently. It shows self-awareness without undercutting the win.</>,
            <>If the story is a failure, the result is the lesson plus proof you applied it somewhere later. Never end on the failure itself.</>,
          ]}
        />
        <DoDont
          doLabel="Endings that land"
          dontLabel="Endings that evaporate"
          dos={[
            '"Cut the inspection cycle from 14 hours to under 4."',
            '"Attendance went from 40 to 110 over two semesters."',
            '"Delivered on time, and the design review checklist became the template for the next two projects."',
          ]}
          donts={[
            '"And yeah, it worked out."',
            '"It was a good learning experience."',
            '"I think it went well overall."',
          ]}
        />
      </>
    ),
  },
  {
    id: 'technical',
    kicker: 'The technical round',
    title: 'They are grading your reasoning, not your recall',
    Icon: Code2,
    body: (
      <>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: '#475569' }}>
          Whatever your discipline, the technical round takes the same shape: a problem you haven&apos;t seen, solved out loud. It might be a coding exercise, a design or sizing problem, a failure analysis, a case study, or a walkthrough of your own portfolio. Especially early career, the technical bar is lower than you fear and the <strong>communication bar is higher than you expect</strong>.
        </p>
        <TipList
          accent={ACCENT}
          items={[
            <><strong>Clarify before you solve.</strong> Restate the problem in your own words. Ask about constraints, assumptions, tolerances, budget, scale, and what &ldquo;done&rdquo; means. Jumping straight to an answer is a red flag, not a green one.</>,
            <><strong>State your assumptions out loud</strong> and write them down where they can see. Half of engineering judgment is knowing what you had to assume.</>,
            <><strong>Never go silent for more than about 90 seconds.</strong> Narrate — &ldquo;I&apos;m weighing whether to size this for peak load or average…&rdquo; Silence reads as stuck; narration reads as collaborative.</>,
            <><strong>Rough answer first, then refine.</strong> A working approximation plus &ldquo;here&apos;s how I&apos;d tighten it&rdquo; beats forty silent minutes chasing the elegant solution.</>,
            <><strong>Name your tradeoffs.</strong> Cost against durability, speed against accuracy, simplicity against flexibility. Explicit tradeoff reasoning is exactly what they&apos;re listening for.</>,
            <><strong>Sanity-check your own work.</strong> Do the units resolve? Is the magnitude plausible? Walk one real case through it before you say you&apos;re done. Catching your own error wins the round.</>,
            <>Being stuck is normal and expected. <em>How you get unstuck</em> is the actual evaluation.</>,
          ]}
        />
      </>
    ),
  },
  {
    id: 'resume-questions',
    kicker: 'The part people skip',
    title: 'Answering questions about your resume',
    Icon: FileText,
    body: (
      <>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: '#475569' }}>
          Assume every single line will be probed. Your resume is a promise; the interview is where you make good on it.
        </p>
        <TipList
          accent={ACCENT}
          items={[
            <>Know the <strong>why</strong> behind each choice, not just the what. Not &ldquo;I used that method&rdquo; but &ldquo;I used that method because we needed a result we could defend to the client in a week.&rdquo;</>,
            <>Prepare each project in <strong>two lengths</strong>: a 60-second version and a 5-minute deep dive. They&apos;ll ask for one and you won&apos;t know which.</>,
            <>Be ready to defend every number you wrote. If a bullet says &ldquo;reduced load time 40%,&rdquo; know how you measured it.</>,
            <>&ldquo;I&apos;d do X differently now, because Y&rdquo; is a <strong>strong</strong> answer, not a weak one. It shows you&apos;ve grown since you shipped it.</>,
            <>If you used a tool, model, or standard you don&apos;t fully understand, say so plainly and say what you&apos;d need to learn. Bluffing gets caught in one follow-up question.</>,
            <><strong>If you can&apos;t defend it, delete it.</strong> A shorter resume you can speak to beats a longer one full of landmines.</>,
          ]}
        />
        <Callout accent={ACCENT} label="Try this">
          Print your resume and put a dot next to every line. For each dot, say your answer out loud to &ldquo;walk me through this.&rdquo; The lines that make you hesitate are exactly the ones they&apos;ll ask about.
        </Callout>
      </>
    ),
  },
  {
    id: 'your-questions',
    kicker: 'Your turn',
    title: 'The questions you ask them',
    Icon: HelpCircle,
    body: (
      <>
        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: '#475569' }}>
          &ldquo;No, I think you covered everything&rdquo; reads as no interest. Bring <strong>five</strong>, because two will get answered during the conversation.
        </p>
        <Chips
          accent={ACCENT}
          groups={[
            { label: 'About the role', tags: ['What does success look like in the first 90 days?', 'What would I be working on in month one?', 'What\'s the hardest part of this job?'] },
            { label: 'About the team', tags: ['How does the team handle design review and disagreement?', 'What does the path from junior to senior look like here?', 'How do technical decisions actually get made?'] },
            { label: 'About them', tags: ['What made you stay?', 'What surprised you when you joined?'] },
          ]}
        />
        <DoDont
          doLabel="Ask"
          dontLabel="Save for later (or skip)"
          dos={[
            'Something that follows up on what they just told you.',
            'Anything that shows you thought about doing the job.',
            '"Is there anything about my background you\'d want me to clarify?" — it lets you fix doubts before you leave.',
          ]}
          donts={[
            'PTO, salary, or remote policy in a first-round screen.',
            'Anything answered on the homepage or the job post.',
            '"So what does your company do?"',
          ]}
        />
      </>
    ),
  },
  {
    id: 'follow-up',
    kicker: 'After',
    title: 'Close it out',
    Icon: Send,
    body: (
      <>
        <TipList
          accent={ACCENT}
          items={[
            <>Before you leave, ask about <strong>next steps and timeline</strong>. It&apos;s normal, it&apos;s expected, and it saves you a week of refreshing your inbox.</>,
            <>Send a thank-you within <strong>24 hours</strong>. Four sentences: thanks, one specific thing from the conversation, one line reinforcing your fit, and that you&apos;re looking forward to next steps.</>,
            <>Write down the questions you got asked while they&apos;re fresh. That list is your prep sheet for the next interview.</>,
            <>Got a rejection? Reply graciously and ask to stay in touch. Recruiters reach back out, and this is a small industry.</>,
            <>Bring your actual questions to a SHPE Austin event — mock interviews and feedback from people who&apos;ve sat on the other side are worth more than another article.</>,
          ]}
        />
        <Callout accent={ACCENT} label="Next">
          A great interview can&apos;t save a resume that never got read. Head to the resume guide and make sure yours gets you in the room.
        </Callout>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap', paddingTop: 4 }}
        >
          <button
            type="button"
            onClick={() => goToGuide('resume')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              padding: '13px 24px', borderRadius: 13, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #FD652F, #D33A02)',
              color: 'white', fontWeight: 900, fontSize: '0.87rem',
              boxShadow: '0 8px 24px rgba(253,101,47,0.32)',
            }}
          >
            Refining Your Resume
            <ArrowRight size={16} />
          </button>
          <Link
            to="/events"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 9,
              padding: '13px 24px', borderRadius: 13,
              background: 'white', border: '1px solid #e2e8f0',
              color: '#475569', fontWeight: 800, fontSize: '0.87rem', textDecoration: 'none',
            }}
          >
            See upcoming events
          </Link>
        </motion.div>
      </>
    ),
  },
];
}

export const interviewGuide = {
  id: 'interview',
  Icon: MessageSquareQuote,
  title: 'Mastering the Interview',
  eyebrow: '11 slides · ~8 min',
  blurb: 'The STAR method, your 90-second pitch, how to reason out loud through any technical problem, and how to defend every line of your resume.',
  highlights: ['STAR, with a worked example', 'Build a 5-story bank', 'Questions to ask them'],
  accent: ACCENT,
  gradient: GRADIENT,
  buildSlides: buildInterviewSlides,
};
