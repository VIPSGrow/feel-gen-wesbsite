"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getTeamMembers } from '@/lib/teamApi';
import type { TeamMember } from '@/lib/types/Team';

const TeamMemberSection = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        setError(null);
        const members = await getTeamMembers();
        setTeamMembers(members);
      } catch (err) {
        console.error('Error fetching team members:', err);
        setError('Failed to load team members');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (loading) {
    return (
      <section className="py-5 " style={{ backgroundColor: 'var(--light-pink-color)' }}>
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center" style={{ height: '400px' }}>
            <div className="col-md-12 text-center">
              <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Loading team members...</span>
              </div>
              <p className="mt-3 text-muted">Loading our leadership team...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || teamMembers.length === 0) {
    return (
      <section className="py-5 bg-light">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-center mb-5">
              <h2 className="display-5 fw-bold text-dark mb-3">Our Leadership Team</h2>
              <p className="lead text-muted">No team members available at the moment.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-5 empower-section" >
        <div className="container-fluid py-5 rounded" >
          <div className="row">
            <div className="col-md-12 text-center mb-5" data-aos="zoom-in">
              <h2 className="display-5 fw-bold text-light mb-3">Our Leadership Team</h2>
              <p className="lead text-light">Meet the experts powering your MLM success across 10 levels</p>
            </div>
            <div className="team-slider-wrapper" data-aos="zoom-in-up">
              <div className="d-flex flex-nowrap gap-3 team-slider overflow-auto pb-3" style={{ scrollSnapType: 'x mandatory' }}>
                {teamMembers.map((member) => (
                  <div className="flex-shrink-0 team-card text-center p-4 border rounded-3 shadow-sm hover-shadow-lg"
                    style={{ minWidth: '100%', maxWidth: '100%', scrollSnapAlign: 'start' }} key={member.id}>
                    <div className="member-image mb-4 mx-auto">
                      <img
                        src={member.image}
                        className="rounded-circle img-fluid shadow"
                        style={{ width: '140px', height: '140px', objectFit: 'cover' }}
                        alt={member.name}
                      />
                    </div>
                    {/* Notice: Kept your default bootstrap setup classes intact here */}
                    <h6 className="fw-bold text-light mb-2 fs-5 title-name">{member.name}</h6>
                    <h6 className="text-brand-pink mb-3 fw-semibold fs-6 text-light title-role">{member.title}</h6>
                    <p className="text-light small mb-3 description-text">{member.bio}</p>
                    <Link href="/about-us" className="btn btn-primary btn-sm px-4">
                      Learn More
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <style jsx>{`
              .team-slider {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
              .team-slider::-webkit-scrollbar {
                display: none;
              }
              @media (min-width: 768px) {
                .team-slider {
                  overflow: visible !important;
                }
                .team-slider {
                  flex-wrap: wrap !important;
                  justify-content: flex-start !important;
                }
                .team-card {
                  min-width: calc(33.333% - 0.75rem) !important;
                  max-width: calc(33.333% - 0.75rem) !important;
                  scrollSnapAlign: none !important;
                }
              }
              @media (min-width: 1200px) {
                .team-card {
                  min-width: calc(33.333% - 0.75rem) !important;
                  max-width: calc(33.333% - 0.75rem) !important;
                }
              }
              
              /* Default state transitions */
              .team-card {
                transition: all 0.3s ease;
              }
              .team-card .title-name,
              .team-card .title-role,
              .team-card .description-text {
                transition: color 0.3s ease;
              }

              /* Hover state transformations */
              .team-card:hover {
                transform: translateY(-8px);
                box-shadow: 0 15px 40px rgba(0,0,0,0.15) !important;
                background-image: linear-gradient(45deg, rgb(141, 198, 63), 1%, rgb(142, 227, 255), 60%, rgb(228, 165, 197)) !important;
              }

              /* Forces nested element typography components to black on hover */
              .team-card:hover .title-name,
              .team-card:hover .title-role,
              .team-card:hover .description-text {
                color: #000000 !important;
              }
            `}</style>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamMemberSection;