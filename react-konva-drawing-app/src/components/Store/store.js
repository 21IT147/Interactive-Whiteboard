import create from 'zustand';

const useRoomStore = create((set) => ({
  roomId: '',
  setRoomId: (id) => set({ roomId: id }),

  // Function to generate and set a new room ID
  generateRoomId: (name) => {
    const generateNumericRoomCode = () => {
      const length = 6;
      let roomCode = '';
      for (let i = 0; i < length; i++) {
        roomCode += Math.floor(Math.random() * 10); // Generate a digit from 0 to 9
      }
      return roomCode;
    };

    const numericCode = generateNumericRoomCode();
    const code = `${name}-${numericCode}`;
    set({ roomId: code });
    return code;
  },
}));

export default useRoomStore;
