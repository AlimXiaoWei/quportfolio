/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Layout } from './Layout';
import { Hero } from './Hero';
import { ProjectView } from './ProjectView';
import { SkillsView } from './SkillsView';
import { ExperienceView } from './ExperienceView';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'home' ? (
        <Hero />
      ) : activeTab === 'skills' ? (
        <SkillsView />
      ) : activeTab === 'experience' ? (
        <ExperienceView />
      ) : (
        <ProjectView projectId={activeTab} />
      )}
    </Layout>
  );
}
