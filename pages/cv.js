import { useEffect, useState } from 'react';
import CurriculumVitae from '../components/Organism/cv';

export default function CV({remoteConfig}) {
	return (
		<CurriculumVitae remoteConfig={remoteConfig}/>
	)
}