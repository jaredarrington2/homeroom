// content/sections/section-6.ts — Module 6, "MLO Activities" (revamp plan v2).
// One reader for the whole origination arc: the file's own order — inquiry, application,
// the forms, pricing, disclosures, verification, ratios, the property, underwriting,
// closing, then the math drill. Covers NMLS content-outline §III (the exam's largest
// area, 27%) without a section *about* the job: each stage names the system the work
// happens in (CRM → LOS/POS → PPE → AUS → doc engine → settlement) where it's used.
// The worked URLA (Maya), the nine-form trainer, and the deal desk mount inside their
// units via ConceptGroup.embed — in the scroll, never on their own pages.
import type { SectionContent } from '@/lib/section';
import unitsA from './m6-units-a';
import unitsB from './m6-units-b';

const section6: SectionContent = {
  id: 'mlo-activities',
  title: 'MLO Activities',
  moduleNumber: 6,
  units: [...unitsA, ...unitsB],
};

export default section6;
