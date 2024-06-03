import { Button } from 'antd';
import { useNavigate } from 'library/hooks';

const App = () => {
  const { navigate, search } = useNavigate();

  console.log(`当前路由`, search);

  const handleClick = () => {
    navigate('/home', { name: '张三', age: 18 });
  };

  return <Button onClick={handleClick}></Button>;
};

export default App;
