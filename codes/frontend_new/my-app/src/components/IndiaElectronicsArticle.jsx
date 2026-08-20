import { useEffect } from 'react';

const ARTICLE_PATH = '/articles/india-electronics-manufacturing/';
const ARTICLE_URL = `https://shivamg3.github.io${ARTICLE_PATH}`;

export default function IndiaElectronicsArticle() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    const previousDescription = description?.content;
    const previousCanonical = canonical?.href;

    document.title = 'Where Does India’s Electronics Manufacturing Chain Actually Get Stuck? — Shivam Garg';
    if (description) description.content = 'A field-level look at India’s electronics manufacturing chain—from product integration and PCB assembly to semiconductor design and fabrication.';
    if (canonical) canonical.href = ARTICLE_URL;

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.content = previousDescription;
      if (canonical && previousCanonical) canonical.href = previousCanonical;
    };
  }, []);

  return (
    <article className="insight-article article-simple">
      <header className="article-hero article-hero-verbatim">
        <h1>Where Does India’s Electronics Manufacturing Chain Actually Get Stuck?</h1>
        <div className="article-byline" aria-label="Article information">
          <span>By Shivam Garg</span>
          <time dateTime="2026-08-20">August 20, 2026</time>
          <span>8 min read</span>
        </div>
      </header>

      <div className="article-layout article-layout-verbatim">
        <div className="article-content">
          <section className="article-opening">
            <p className="article-first">When we talk about electronics manufacturing in India, what exactly are we talking about?</p>
            <p>The final product? The PCB and components inside it? Or the semiconductor at the bottom of the stack?</p>
            <p>To understand exactly that, I reached out to people working across electronics. From builders of avionics, UAVs, radars and space systems to process owners in PCB manufacturing and chip designers, I found that the issue, as expected, really changes depending on which layer you are looking at. To understand the complete picture, it is important to bring some structure and follow a product from the top down.</p>
          </section>

          <figure className="manufacturing-stack">
            <div className="diagram-frame"><img src={`${import.meta.env.BASE_URL}articles/india-electronics-manufacturing-chain.png`} alt="Three-layer electronics manufacturing chain: application and product, PCB and electronics, and semiconductor" /></div>
          </figure>

          <section className="article-layer layer-product">
            <p className="layer-definition">The top layer refers to the final product or system integration stage, where companies assemble complete devices by integrating electronic components, modules, and subsystems into a working end product.</p>
            <p>Companies still do a lot of "white-labelling" here, but with the competitive quality and pricing of Indian packaging, it often boils down to importing electronic components. The import dependence comes from requiring the exact hardware that an application needs. Indian suppliers may exist, but specialised systems can require a particular set of key characteristics, such as frequency range, bandwidth, processing capability or computing platform. If that exact requirement is not available locally, the team imports it.</p>
            <p>Lead time can then become a source of delay and is often dependent on overseas conditions. For reference, hardware that could take about a week to obtain in the US can take roughly a month to a month and a half in India. This can push teams to look for substitutes, redesign around what is available, work on another part of the system, or delay a demonstration.</p>
            <p>A key initial issue while onboarding a local supplier is trusting them to deliver the right product at the right time. One engineer described how interfacing issues with a faulty magnetometer sourced locally led to lost engineering time. Experiences like these can contribute to a heavier dependence on overseas sourcing. This foreign vendor dependence further extends from physical FPGAs to IP blocks such as DDR, Ethernet and clock-management.</p>
            <p>In similar examples, the integration of tight-tolerance optical assemblies and critical motor components highlights the scope for improvement in precision manufacturing at scale.</p>
            <p>Interestingly, though, in underwater robotics, much more than the device or component itself, the PCB connections were described as a major source of trouble. Thus, it was natural for me to move one layer further down the manufacturing chain, to where these devices and components are assembled onto PCBs at scale.</p>
          </section>

          <section className="article-layer layer-pcb">
            <p className="layer-definition">The second layer is PCB manufacturing and assembly, where electronic components are mounted onto printed circuit boards and the bare design is turned into a physical, manufacturable system.</p>
            <p>Shop-floor engineers directly describe features such as back-drilling, blind and buried vias, and other geometry changes as tough asks in PCB manufacturing. They also describe the importance of tighter handling and placement control to prevent issues such as static discharge, bent pins, pin lift, component damage and incorrect polarity during production.</p>
            <p>Supplier variations directly affect processes such as screen printing and reflow, where parameters may have to be adjusted for variations in materials or masks.</p>
            <blockquote>But a board coming out of production does not mean the job is finished.</blockquote>
            <p>Several engineers pointed to problems that appear only during qualification. A typical issue repeated across multiple conversations was that components which work normally can fail under thermal shock, vibration or temperature cycling. Solder joints, connectors and antenna matching may hold up in the lab but behave differently once the product is inside an enclosure and exposed to field conditions.</p>
            <p>Furthermore, radiated emission or immunity failures can force circuit changes or the addition of ferrites, although these are usually manageable.</p>
            <p>These are not just problems, but also areas where firms can improve and gain a direct advantage.</p>
            <p>But at this point, as we keep following the electronics further down the stack, we eventually arrive at the semiconductor layer.</p>
          </section>

          <section className="article-layer layer-semiconductor">
            <h2 className="verbatim-section-title">The semiconductor layer (chip design and fabrication layer)</h2>
            <p>Currently, for a small Indian chip-design team, access to design software is not the main barrier, as digital design tools are fairly accessible. The harder part comes when the design needs to become an actual chip.</p>
            <p>That requires access to a PDK and then to fabrication, often through an MPW shuttle. Engineers described that access as much harder to obtain, particularly for smaller teams outside funded labs or government programmes.</p>
            <p>India does have facilities such as SCL Chandigarh, with a 180 nm process that is useful for teaching and some applications, but it does not cover the newer process requirements of many chip startups. For those requirements, companies still look to overseas foundries such as TSMC.</p>
            <p>New foundry capacity is being set up in India, with hopes of reaching mass production in the next 3–5 years, but the people I spoke with did not yet see domestic fabrication as an immediate option.</p>
          </section>

          <section className="article-conclusion article-conclusion-verbatim">
            <p>To conclude, the final system may be built here while an FPGA is imported. The PCB may be assembled here while most of its SMDs come from overseas. And the chip itself may be designed here while fabrication still happens abroad.</p>
            <p>All in all, a chain of dependencies that changes as you move down the stack that say there is already a lot happening, but there is also much wider scope for new opportunities.</p>
          </section>
        </div>
      </div>
    </article>
  );
}
