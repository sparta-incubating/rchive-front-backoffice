import RoleSelectForm from '@/components/organisms/roleSelectForm';

const RolePage = ({ params }: { params: { role: string } }) => {
  return (
    <div className="flex h-screen w-screen bg-blue-55">
      <RoleSelectForm role={params.role} />
    </div>
  );
};

export default RolePage;
