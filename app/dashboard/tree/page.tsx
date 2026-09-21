'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function TreePage() {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchDownline = async () => {
            try {
                const res = await api.get('/users/downline');
                setMembers(res.data);
            } catch (err) {
                console.error("Failed to fetch tree");
            }
        };
        fetchDownline();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Downline (Genealogy)</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-5 py-3 border-b">Username</th>
                            <th className="px-5 py-3 border-b">Level</th>
                            <th className="px-5 py-3 border-b">Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((m: any) => (
                            <tr key={m.id}>
                                <td className="px-5 py-5 border-b">{m.username}</td>
                                <td className="px-5 py-5 border-b">
                                    {/* Calculate level by counting dots in node_path */}
                                    {m.node_path.split('.').length}
                                </td>
                                <td className="px-5 py-5 border-b">
                                    {new Date(m.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}