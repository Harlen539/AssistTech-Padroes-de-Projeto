import { BriefcaseBusiness, Building2, Code2, Landmark, LockKeyhole, Monitor, UsersRound, Wifi } from 'lucide-react';

const icons = {
  Hardware: Monitor,
  Software: Code2,
  Rede: Wifi,
  Acesso: LockKeyhole,
  Financeiro: Landmark,
  Comercial: BriefcaseBusiness,
  'Recursos Humanos': UsersRound,
  Administrativo: Building2,
};

function CategoryLabel({ category, boxed = false }) {
  const Icon = icons[category] ?? Monitor;
  const slug = category.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');

  return (
    <span className={`category-label ${boxed ? `boxed ${slug}` : ''}`}>
      <Icon />
      {category}
    </span>
  );
}

export default CategoryLabel;
