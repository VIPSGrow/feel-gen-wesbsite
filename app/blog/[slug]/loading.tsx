import React from 'react';

export default function Loading() {
    return (
        <section className="py-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        <div className="animate-pulse">
                            {/* Featured image skeleton */}
                            <div className="bg-gray-200 h-96 rounded mb-4"></div>
                            {/* Meta skeleton */}
                            <div className="flex gap-3 mb-4">
                                <div className="bg-gray-200 h-4 w-20 rounded"></div>
                                <div className="bg-gray-200 h-4 w-24 rounded"></div>
                            </div>
                            {/* Title skeleton */}
                            <div className="bg-gray-200 h-10 w-4/5 rounded mb-6"></div>
                            {/* Content skeleton */}
                            <div className="space-y-4">
                                <div className="bg-gray-200 h-6 w-full rounded"></div>
                                <div className="bg-gray-200 h-6 w-5/6 rounded"></div>
                                <div className="bg-gray-200 h-6 w-4/6 rounded"></div>
                                <div className="bg-gray-200 h-6 w-3/4 rounded"></div>
                                <div className="bg-gray-200 h-6 w-2/3 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
