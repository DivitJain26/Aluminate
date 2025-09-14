export default function PageHeader({ title, subtitle }) {
    return (
        <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-black mb-2">{title}</h1>
            <p className="text-gray-600">{subtitle}</p>
        </div>
    );
}