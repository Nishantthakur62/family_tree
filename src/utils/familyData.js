export const PROFILE_PREFIX = 'family-profile-';
export const EXPORT_PREFIX = 'family-export-';

export const isValidTree = (tree) => {
	if (!tree || typeof tree !== 'object' || typeof tree.id !== 'string' || !tree.id || typeof tree.name !== 'string' || !tree.name.trim()) return false;

	const children = Array.isArray(tree.children) ? tree.children : [];
	const siblings = Array.isArray(tree.siblings) ? tree.siblings : [];
	return (!tree.children || Array.isArray(tree.children))
		&& (!tree.siblings || Array.isArray(tree.siblings))
		&& [...children, ...siblings].every(isValidTree)
		&& (!tree.spouse || isValidTree(tree.spouse));
};

export const getUniqueProfileId = (baseId) => {
	const cleanBaseId = String(baseId || 'imported').replace(/[^a-zA-Z0-9_-]/g, '-');
	let profileId = cleanBaseId;
	let suffix = 1;
	while (localStorage.getItem(`${PROFILE_PREFIX}${profileId}`)) {
		profileId = `${cleanBaseId}-${suffix}`;
		suffix += 1;
	}
	return profileId;
};

export const createArchive = ({ fullName, familyName, phone, tree }) => ({
	format: 'familyroots-tree',
	version: 1,
	fullName,
	familyName,
	phone,
	exportedAt: new Date().toISOString(),
	tree,
});
