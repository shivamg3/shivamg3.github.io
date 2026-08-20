import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ARTICLE_PATH = '/articles/india-electronics-manufacturing/';
const ARTICLE_URL = `https://shivamg3.github.io${ARTICLE_PATH}`;

export default function IndiaElectronicsArticle() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    const previousDescription = description?.content;
    const previousCanonical = canonical?.href;

    document.title = 'Where Does India’s Electronics Manufacturing Chain Get Stuck? — Shivam Garg';
    if (description) description.content = 'A field-level look at India’s electronics manufacturing chain—from product integration and PCB assembly to semiconductor design and fabrication.';
    if (canonical) canonical.href = ARTICLE_URL;

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.content = previousDescription;
      if (canonical && previousCanonical) canonical.href = previousCanonical;
    };
  }, []);

  return (
    <article className="insight-article">
      <header className="article-hero">
        <p className="kicker">Field notes · Electronics manufacturing · India</p>
        <h1>Where Does India’s Electronics Manufacturing Chain Actually Get Stuck?</h1>
        <p className="article-deck">The answer changes depending on whether you are building the product, assembling the PCB, or trying to turn a chip design into silicon.</p>
        <div className="article-byline"><span>By Shivam Garg</span><time dateTime="2026-08-20">August 20, 2026</time><span>8 min read</span></div>
      </header>

      <div className="article-layout">
        <aside className="article-rail">
          <p>In this article</p>
          <nav aria-label="Article sections">
            <a href="#stack">The three-layer stack</a>
            <a href="#product">01 · Product integration</a>
            <a href="#pcb">02 · PCB & electronics</a>
            <a href="#semiconductor">03 · Semiconductors</a>
            <a href="#conclusion">What the chain reveals</a>
          </nav>
        </aside>

        <div className="article-content">
          <section className="article-opening">
            <p className="article-first">When we talk about electronics manufacturing in India, what exactly are we talking about?</p>
            <p>The final product? The PCB and components inside it? Or the semiconductor at the bottom of the stack?</p>
            <p>To understand where the chain actually gets stuck, I reached out to people working across electronics—from builders of avionics, UAVs, radars, and space systems to process owners in PCB manufacturing and chip designers. The issue, as expected, changes depending on the layer you are looking at.</p>
            <p>To see the complete picture, it helps to bring some structure to the discussion and follow a product from the top down.</p>
          </section>

          <figure className="manufacturing-stack" id="stack">
            <div className="diagram-frame"><img src={`${import.meta.env.BASE_URL}articles/india-electronics-manufacturing-chain.png`} alt="Three-layer electronics manufacturing chain: application and product, PCB and electronics, and semiconductor" /></div>
            <figcaption><span>Figure 1</span>The electronics manufacturing stack used to organize the conversations in this article.</figcaption>
          </figure>

          <section className="article-layer layer-product" id="product">
            <div className="layer-heading"><span>01</span><div><p>Application / Product</p><h2>The final system can be built here—and still depend on what comes from elsewhere.</h2></div></div>
            <p className="layer-definition">The top layer is the final product or system-integration stage, where companies combine electronic components, modules, and subsystems into a working end product.</p>
            <p>White-labelling remains common at this layer. Even where Indian packaging is competitive in quality and price, the underlying electronic components are often imported because an application needs exact hardware characteristics: a specific frequency range, bandwidth, processing capability, or computing platform. A local supplier may exist, but if the precise requirement is unavailable, the team imports it.</p>
            <p>Lead time then becomes a source of delay and often depends on overseas conditions. One engineer estimated that hardware available in about a week in the United States could take roughly a month to a month and a half to reach a team in India. That delay can force engineers to find substitutes, redesign around what is available, work on another subsystem, or postpone a demonstration.</p>
            <p>Trust is another early hurdle when onboarding a local supplier. One engineer described losing development time to interfacing problems caused by a faulty magnetometer sourced locally. Experiences like these can reinforce dependence on overseas vendors—not only for physical FPGAs, but also for IP blocks such as DDR, Ethernet, and clock management.</p>
            <p>The integration of tight-tolerance optical assemblies and critical motor components points to another opportunity: improving precision manufacturing at scale.</p>
            <p>Yet in underwater robotics, engineers described the PCB connections—not the headline device or component—as a major source of trouble. That naturally takes us one layer deeper, to where devices and components are assembled onto boards at scale.</p>
          </section>

          <section className="article-layer layer-pcb" id="pcb">
            <div className="layer-heading"><span>02</span><div><p>PCB / Electronics</p><h2>Manufacturability is only the beginning. Qualification reveals the rest.</h2></div></div>
            <p className="layer-definition">The second layer is PCB manufacturing and assembly, where electronic components are mounted onto printed circuit boards and a bare design becomes a physical, manufacturable system.</p>
            <p>Shop-floor engineers described features such as back-drilling, blind and buried vias, and other geometry changes as difficult asks in PCB manufacturing. They also emphasized tighter handling and placement control to prevent static discharge, bent pins, pin lift, component damage, and incorrect polarity during production.</p>
            <p>Supplier variation directly affects processes such as screen printing and reflow. Parameters may need to be adjusted when materials or masks vary between suppliers.</p>

            <blockquote>A board coming out of production does not mean the job is finished.</blockquote>

            <p>Several engineers pointed to failures that appear only during qualification. Components that work normally can fail under thermal shock, vibration, or temperature cycling. Solder joints, connectors, and antenna matching may hold up in the lab but behave differently once the product is enclosed and exposed to field conditions.</p>
            <p>Radiated-emission or immunity failures can also force circuit changes or the addition of ferrites, although engineers generally described those issues as manageable.</p>
            <p>These are not simply problems. They are areas where manufacturers can build repeatable capability—and gain a direct competitive advantage.</p>
          </section>

          <section className="article-layer layer-semiconductor" id="semiconductor">
            <div className="layer-heading"><span>03</span><div><p>Semiconductor</p><h2>Design tools are accessible. Turning a design into silicon is harder.</h2></div></div>
            <p className="layer-definition">The semiconductor layer covers chip design and fabrication: the point where electronic architecture must become a physical device.</p>
            <p>For a small Indian chip-design team, access to digital design software was not described as the primary barrier. The harder part begins when the design needs to become an actual chip.</p>
            <p>That requires access to a process design kit, or PDK, and then to fabrication—often through a multi-project wafer, or MPW, shuttle. Engineers described both as much harder to obtain, particularly for smaller teams outside funded laboratories or government programmes.</p>
            <p>India has facilities such as SCL Chandigarh, whose 180 nm process is useful for teaching and some applications. But it does not cover the newer process requirements of many chip startups. For those needs, companies still look to overseas foundries such as TSMC.</p>
            <p>New domestic foundry capacity is being developed, with hopes of reaching mass production within the next three to five years. The people I spoke with, however, did not yet see domestic fabrication as an immediate option.</p>
          </section>

          <section className="article-conclusion" id="conclusion">
            <p className="kicker">What the chain reveals</p>
            <h2>The bottleneck is not one missing factory. It moves with the layer.</h2>
            <p>The final system may be built in India while its FPGA is imported. The PCB may be assembled here while most of its surface-mount devices come from overseas. The chip itself may be designed here while fabrication still happens abroad.</p>
            <div className="article-takeaways">
              <div><span>Application</span><strong>Specialized components, supplier confidence, lead time, and precision at scale</strong></div>
              <div><span>PCB</span><strong>Process capability, repeatability, handling, and qualification under real conditions</strong></div>
              <div><span>Semiconductor</span><strong>PDK access, MPW access, and domestic fabrication pathways</strong></div>
            </div>
            <p>There is already meaningful work happening at every layer. The opportunity is wider: deepen capability within each one, and make the interfaces between them more dependable. That is where a more resilient electronics manufacturing chain can begin to take shape.</p>
          </section>

          <footer className="article-note">
            <p><strong>About this article</strong> This analysis synthesizes conversations with engineers and practitioners working across product integration, PCB manufacturing, and semiconductor design. Individual observations have been generalized to keep the focus on recurring manufacturing patterns.</p>
            <div><Link to="/projects">Explore my engineering work <span>→</span></Link><Link to="/contact">Continue the conversation <span>→</span></Link></div>
          </footer>
        </div>
      </div>
    </article>
  );
}
