import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Counters and reveals should feel snappy; keep the default ease consistent
// with DESIGN.md section 6.
gsap.defaults({ ease: 'power3.out' });

export { gsap, ScrollTrigger };
