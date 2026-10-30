type UserProfile = {
  username: string;
  email?: string; // Bisa string, bisa juga undefined
};

// karena opsional, email bisa kita kosongkan di objek ini
const userBaru: UserProfile = {
  username: 'Budi',
};

// jika pakai optional chaining seperti ini (?)
// setidaknya hanya akan menghasilkan undefined, bukan crash
console.log(userBaru.email?.length); 
