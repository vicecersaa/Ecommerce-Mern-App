import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminList() {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin-users');
                setAdmins(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAdmins();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2 className='text-lg font-base mb-7'>Akun Admin : </h2>
            <div className='flex flex-wrap gap-5'>
                {admins.map(admin => (
                    <div className="rounded-md border-[1px] border-black p-3" key={admin._id}>
                        <h3 className='font-sans font-semibold mb-3 '>Admin</h3>
                        <p className='font-sans'>Username : <span className=' font-sans'>{admin.name}</span></p>
                        <p className='font-sans'>Email : <span className=' font-sans'>{admin.email}</span></p>
                        <p className='font-sans'>Role : <span className=' font-sans'>{admin.role}</span></p>
                    </div>
                ))}
            </div>
        </div>
    );
}
