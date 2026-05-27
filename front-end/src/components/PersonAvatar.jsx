function PersonAvatar({ name, size = 'medium' }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('');
  const colorKey = (name.charCodeAt(0) + name.length) % 4;

  return <span className={`person-avatar ${size} avatar-color-${colorKey}`}>{initials}</span>;
}

export default PersonAvatar;
