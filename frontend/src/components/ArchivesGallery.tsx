// Using placeholder images - these should be replaced with local assets
const GALLERY_ITEMS = [
    {
        id: 1,
        title: 'The Silk Road Logistics',
        description: 'A temporal map of trade routes from 200 BCE to 1450 CE.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtT8udp-Rz5OuzsrIO0rzNEHjHp7JehkdmQxZOk5016XwCbrA62L6paXQyaXv-U2LXJ3YHi78fRVaRnqL57PPoXEeH8CtI0-VeaOwzV9K8mxkhkirSkltX6SgcNau0PZuVKOgt_oaYhhKd79uM_za8o82afVvStk8KFC4uUa1LJYeFaawE734Wm4lJ6yLFGI_bP4CEN5-xXSIafb4_FFy9J-zEJyuIXnZnqAHFpP2RN8i8_c3Ialk-nvqoIaNVBk-T7o0a3ns00YA',
    },
    {
        id: 2,
        title: 'Cognitive Bias Web',
        description: 'Mapping the 188 known cognitive biases and their interactions.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfY_ld6iZX1ekOzL7wuaKsdOcx4nsVpXLVTcBhHLfgr1j1Wi5tAqECVESRuqc9VO_kaJT0wbgVmesyU4EEfjG56qfRy5JsgSnpyiPwX1eALwQGfILkSaSveB1MPzpoJ3r_sFD-zffD7--w-jHaAoen2ZvZ_872cfzHrMg9W1iOs_jFqlbxQeCf8ux7nCR8XRkFRsyDbXPmDFpQzOH6ZI-CLBaeJilw7rT2vkX-BLbJ-AdYSOTs08DTqvfzWwcPAQRmOKZavZBUmYs',
    },
    {
        id: 3,
        title: 'Quantum Theory Lineage',
        description: 'The architectural evolution of modern physics from Planck to now.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_GnIrO74GfYC588_xgN0AYgJqLTsOyzTgIJiLeztnL8WQ4p_fcn2K-2HvvXkXTxG9smLZrkmkuGmWcTw7d_LzPVJ5SO0yD_QmJxHoEp1F6coX-4C71C99lm0nQEPTWUE4TnLbPyoQNBjCclecz29ogb7Jjc0JNno0c1Ny1GtAv8n1miPLVVQ0NwazbbyvYWyXMDTModbukrb66ar501KZfNspLlyLDIQNW10IAOehXtbMIVbIcWARkKibEQ6mSIp8xLsaMDGurLo',
    },
];

export function ArchivesGallery() {
    return (
        <section className="py-24 bg-espresso text-parchment px-6 border-t border-[#4A3B32]">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h3 className="text-3xl font-serif text-white mb-2">Explore the Archives</h3>
                        <p className="text-parchment/60">Discover how others are mapping the world's most complex ideas.</p>
                    </div>
                    <button className="text-gold flex items-center gap-2 hover:underline decoration-gold/50 underline-offset-4">
                        View Full Gallery
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </button>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {GALLERY_ITEMS.map((item) => (
                        <div key={item.id} className="space-y-4 cursor-pointer group">
                            <div
                                className="h-64 rounded-xl overflow-hidden border border-[#4A3B32] bg-cover bg-center grayscale group-hover:grayscale-0 transition duration-500"
                                style={{ backgroundImage: `url('${item.image}')` }}
                            ></div>
                            <h4 className="font-serif text-lg text-white">{item.title}</h4>
                            <p className="text-sm text-parchment/50">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
