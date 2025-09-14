import AlumniCard from './AlumniCard';

export default function AlumniGrid({ alumni, loading }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {alumni.map((person) => (
                <AlumniCard key={person._id} person={person} loading={loading} />
            ))}
        </div>
    );
}