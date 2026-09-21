"use client";
import React, { useEffect, useState } from "react";
import { IndianRupee, Target, Gift, Trophy, TrendingUp } from "lucide-react";
import serverCallFuction from "@/lib/constantFunction";

interface GenerationCommission {
  level: number;
  level_name: string;
  percentage: string;
}

interface MlmReward {
  id?: number;
  reward_type: string;
  reward_value: string;
  reward_description: string;
}

interface MlmPlanData {
  generation_commissions: GenerationCommission[];
  rewards: MlmReward[];
  plan_settings: {
    mrp: string;
    direct_partner_commission_percentage: string;
    distributor_price: string;
    packets_per_package: string;
    holding_period_days: string;
    maximum_generation_level: string;
  };
}

const GenerationPlanSection = () => {
  const [planData, setPlanData] = useState<MlmPlanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlan = async () => {
      try {
        const response = await serverCallFuction("GET", "api/settings/mlm-plan");
        if (response.success || response.status) {
          const body = response.data || {};
          setPlanData({
            generation_commissions: (body.generation_commissions || body.commissions || []).map((item: any) => ({
              level: Number(item.level ?? item.level_no),
              level_name: String(item.level_name || `Generation ${item.level ?? item.level_no}`),
              percentage: String((item.percentage ?? item.commission_percentage) || "0"),
            })),
            rewards: (body.rewards || []).map((item: any) => ({
              id: typeof item.id === "number" ? item.id : undefined,
              reward_type: String(item.reward_type || ""),
              reward_value: String(item.reward_value || "0"),
              reward_description: String((item.reward_description ?? item.description) || ""),
            })),
            plan_settings: {
              mrp: String(body.plan_settings?.mrp || body.settings?.mrp || "0"),
              direct_partner_commission_percentage: String(body.plan_settings?.direct_partner_commission_percentage || body.settings?.direct_partner_commission_percentage || "0"),
              distributor_price: String(body.plan_settings?.distributor_price || body.settings?.distributor_price || "0"),
              packets_per_package: String(body.plan_settings?.packets_per_package || body.settings?.packets_per_package || "0"),
              holding_period_days: String(body.plan_settings?.holding_period_days || body.settings?.holding_period_days || "0"),
              maximum_generation_level: String(body.plan_settings?.maximum_generation_level || body.settings?.maximum_generation_level || "7"),
            },
          });
        } else {
          throw new Error(response.message || "Failed to load plan data");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load generation plan");
      } finally {
        setLoading(false);
      }
    };

    loadPlan();
  }, []);

  if (loading) {
    return (
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading Generation Plan...</span>
            </div>
            <p className="mt-3 text-muted">Loading Generation Plan & Reward Income...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !planData) {
    return (
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center py-5">
            <div className="text-error-500 mb-3">
              <Trophy size={48} />
            </div>
            <h3 className="fw-bold">Unable to Load Plan</h3>
            <p className="text-muted">{error || "Generation plan data is not available"}</p>
          </div>
        </div>
      </section>
    );
  }

  const { generation_commissions, rewards, plan_settings } = planData;
  const maxLevel = Math.max(...generation_commissions.map(c => c.level), 1);
  const sortedCommissions = [...generation_commissions].sort((a, b) => a.level - b.level);

  return (
    <section className="py-5 bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container">
        <div className="text-center mb-5" data-aos="zoom-in">
          <h2 className="display-5 fw-bold text-primary">
            Generation Plan & <span style={{ color: 'var(--primary-color)' }}>Reward Income</span>
          </h2>
          <p className="lead text-muted mx-auto mt-2" style={{ maxWidth: '800px' }}>
            Unlock unlimited earning potential with Feel Safe's multi-level generation plan.
            Build your network and earn from every level.
          </p>
        </div>

        <div className="row g-4 mb-5" data-aos="zoom-in-up">
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm bg-primary text-white">
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <IndianRupee size={32} className="text-white" />
                </div>
                <h3 className="display-6 fw-bold mb-1">₹{plan_settings.mrp}</h3>
                <p className="mb-0 opacity-75">Product MRP</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm bg-success text-white">
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <Target size={32} className="text-white" />
                </div>
                <h3 className="display-6 fw-bold mb-1">{plan_settings.direct_partner_commission_percentage}%</h3>
                <p className="mb-0 opacity-75">Direct Partner Commission</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm bg-warning text-white">
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <TrendingUp size={32} className="text-white" />
                </div>
                <h3 className="display-6 fw-bold mb-1">{maxLevel} Levels</h3>
                <p className="mb-0 opacity-75">Generation Depth</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm bg-info text-white">
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <Gift size={32} className="text-white" />
                </div>
                <h3 className="display-6 fw-bold mb-1">{rewards.length}</h3>
                <p className="mb-0 opacity-75">Reward Categories</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4 mb-5" data-aos="zoom-in-up">
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-white border-0 pb-0">
                <h4 className="fw-bold mb-0">Generation Commission Structure</h4>
                <p className="text-muted small mb-0">Earn commission from each generation in your network</p>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="ps-4 py-3">Generation</th>
                        <th className="py-3">Level Name</th>
                        <th className="py-3">Commission %</th>
                        <th className="pe-4 py-3 text-end">Est. Earning (per ₹{plan_settings.mrp} sale)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedCommissions.map((commission) => (
                        <tr key={commission.level}>
                          <td className="ps-4">
                            <span className="badge bg-primary-subtle text-primary fw-medium px-3 py-2 fs-6">
                              Gen {commission.level}
                            </span>
                          </td>
                          <td className="fw-medium">{commission.level_name}</td>
                          <td>
                            <span className="fw-bold text-success fs-5">{commission.percentage}%</span>
                          </td>
                          <td className="pe-4 text-end">
                            <span className="fw-bold text-primary">
                              ₹{((Number(plan_settings.mrp) * Number(commission.percentage)) / 100).toFixed(2)}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {sortedCommissions.length === 0 && (
                        <tr>
                          <td colSpan={4} className="text-center py-5 text-muted">
                            No generation commissions configured yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-white border-0 pb-0">
                <h4 className="fw-bold mb-0">Plan Highlights</h4>
              </div>
              <div className="card-body">
                <ul className="list-unstyled mb-0">
                  <li className="d-flex align-items-start mb-3 p-3 rounded bg-light">
                    <IndianRupee className="text-primary me-3 mt-1" size={20} />
                    <div>
                      <strong>Distributor Price:</strong> ₹{plan_settings.distributor_price}
                    </div>
                  </li>
                  <li className="d-flex align-items-start mb-3 p-3 rounded bg-light">
                    <Target className="text-success me-3 mt-1" size={20} />
                    <div>
                      <strong>Packets per Package:</strong> {plan_settings.packets_per_package}
                    </div>
                  </li>
                  <li className="d-flex align-items-start mb-3 p-3 rounded bg-light">
                    <TrendingUp className="text-warning me-3 mt-1" size={20} />
                    <div>
                      <strong>Holding Period:</strong> {plan_settings.holding_period_days} days
                    </div>
                  </li>
                  <li className="d-flex align-items-start mb-3 p-3 rounded bg-light">
                    <Trophy className="text-info me-3 mt-1" size={20} />
                    <div>
                      <strong>Max Generation Level:</strong> {plan_settings.maximum_generation_level}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {rewards.length > 0 && (
          <div data-aos="zoom-in-up">
            <div className="text-center mb-4">
              <h4 className="fw-bold mb-1">Achievement Rewards</h4>
              <p className="text-muted">Unlock exciting rewards as you achieve milestones</p>
            </div>
            <div className="row g-4">
              {rewards.map((reward, index) => (
                <div className="col-md-6 col-lg-4" key={reward.id ?? `reward-${index}`}>
                  <div className="card h-100 border-0 shadow-sm hover-shadow transition-all duration-300">
                    <div className="card-body p-4 text-center">
                      <div className="bg-primary-subtle rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "70px", height: "70px" }}>
                        <Gift className="text-primary" size={28} />
                      </div>
                      <h5 className="fw-bold mb-2">{reward.reward_type}</h5>
                      <div className="mb-2">
                        <IndianRupee className="me-1" size={18} />
                        <span className="fw-bold text-success fs-4">{Number(reward.reward_value).toLocaleString("en-IN")}</span>
                      </div>
                      <p className="text-muted small mb-0">{reward.reward_description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-5 pt-4 border-top" data-aos="fade-up">
          <p className="text-muted mb-3">
            Ready to start your journey with Feel Safe Sakhi Yojna?
          </p>
          <a
            href="/register"
            className="btn btn-primary btn-lg px-5 py-3 rounded-pill fw-medium"
          >
            Join Now & Start Earning
            <TrendingUp className="ms-2" size={18} />
          </a>
        </div>
      </div></section>
  );
};

export default GenerationPlanSection;