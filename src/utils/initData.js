export const initializeDemoData = () => {
  if (!localStorage.getItem('users')) {
    const demoUsers = [
      {
        id: '1',
        name: 'Admin',
        email: 'admin@chat.com',
        password: 'admin123',
        isAdmin: true,
        age: '30',
        place: 'New York',
        about: 'System Administrator'
      },
      {
        id: '2',
        name: 'John Doe',
        email: 'john@test.com',
        password: '123456',
        isAdmin: false,
        age: '25',
        place: 'California',
        about: 'Software Developer'
      }
    ];
    localStorage.setItem('users', JSON.stringify(demoUsers));
  }
  
  if (!localStorage.getItem('chatMessages')) {
    localStorage.setItem('chatMessages', JSON.stringify([]));
  }
};