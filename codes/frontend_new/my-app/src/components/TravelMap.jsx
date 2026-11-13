import { useRef } from 'react';

const places = [
  ['Urbana', 'urbana.jpg'], ['Chicago', 'chicago.jpg'], ['New York', 'new_york.jpg'],
  ['Boston', 'boston.jpg'], ['Grand Rapids', 'grand_rapids.jpg'], ['Springfield', 'springfield.jpg'],
  ['Dubai', 'dubai.jpg'], ['Rajasthan', 'rajasthan.jpg'],
];

export default function TravelMap() {
  const gallery = useRef(null);
  return <div className="places">
    <div className="places-gallery" ref={gallery}>{places.map(([name, image]) => <figure key={name}><img loading="lazy" src={'/images/' + image} alt={name} /><figcaption>{name}</figcaption></figure>)}</div>
    <div className="gallery-controls"><button type="button" aria-label="Previous places" onClick={() => gallery.current?.scrollBy({ left: -gallery.current.clientWidth * .8, behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}>←</button><button type="button" aria-label="Next places" onClick={() => gallery.current?.scrollBy({ left: gallery.current.clientWidth * .8, behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}>→</button></div>
  </div>;
}
