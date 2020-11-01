import useAuth from '@hooks/useAuth';

const Header = () => {
  const {
    user: { user_metadata: meta },
    logout,
  } = useAuth();

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>
        <img src={meta.avatar_url} alt="" style={{ width: '2rem', height: '2rem', borderRadius: '50%' }} />
        <span>{meta.full_name}</span>
      </span>

      <button onClick={() => confirm('Do you want to log out?') && logout()}>Logout</button>
    </div>
  );
};

export default Header;
