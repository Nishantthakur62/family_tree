import { generateUUID } from './uuid';

export const PROFILE_PREFIX = 'family-profile-';
export const EXPORT_PREFIX = 'family-export-';

export const isValidTree = (tree) => {
	return validateTreeNode(tree, new Set());
};

const validateTreeNode = (tree, ids) => {
	if (!tree || typeof tree !== 'object' || typeof tree.id !== 'string' || !tree.id || ids.has(tree.id) || typeof tree.name !== 'string' || !tree.name.trim()) return false;
	ids.add(tree.id);
	const children = Array.isArray(tree.children) ? tree.children : null;
	const siblings = Array.isArray(tree.siblings) ? tree.siblings : null;
	const hasValidChildren = children && children.every((child) => validateTreeNode(child, ids));
	const hasValidSiblings = siblings && siblings.every((sibling) => validateTreeNode(sibling, ids));
	const hasValidSpouse = !Object.prototype.hasOwnProperty.call(tree, 'spouse') || validateTreeNode(tree.spouse, ids);
	return hasValidChildren && hasValidSiblings && hasValidSpouse;
};

export const normalizeTree = (tree) => {
	if (!tree || typeof tree !== 'object') return null;
	const normalized = {
		...tree,
		id: typeof tree.id === 'string' && tree.id ? tree.id : generateUUID(),
		children: Array.isArray(tree.children) ? tree.children.map(normalizeTree) : [],
		siblings: Array.isArray(tree.siblings) ? tree.siblings.map(normalizeTree) : [],
	};
	if (Object.prototype.hasOwnProperty.call(tree, 'spouse')) normalized.spouse = normalizeTree(tree.spouse);
	return normalized;
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
