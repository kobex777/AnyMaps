import silkRoadImg from '@/assets/images/gallery-of-thought/silk_road.png';
import cognitiveBiasImg from '@/assets/images/gallery-of-thought/Cognitive_bias_web.png';
import quantumLineageImg from '@/assets/images/gallery-of-thought/Quantum_lineage.png';

export const GALLERY_ITEMS = [
    {
        id: 'silk-road',
        label: 'Fig. I',
        title: 'Silk Road Logistics',
        description: 'A temporal map of trade routes from 200 BCE to 1450 CE.',
        image: silkRoadImg,
        className: 'md:mt-0', // First item alignment
        categories: ['History']
    },
    {
        id: 'cognitive-bias',
        label: 'Fig. II',
        title: 'Cognitive Bias Web',
        description: 'Mapping 188 known cognitive biases and their interactions.',
        image: cognitiveBiasImg,
        className: 'md:mt-16', // Staggered alignment
        categories: ['Science', 'Philosophy']
    },
    {
        id: 'quantum-lineage',
        label: 'Fig. III',
        title: 'Quantum Lineage',
        description: 'Evolution of modern physics from Planck to quantum computing.',
        image: quantumLineageImg,
        className: 'md:-mt-8', // Staggered alignment
        categories: ['Science', 'Art']
    }
];
