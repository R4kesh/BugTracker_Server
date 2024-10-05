import User from '../models/userModel.js';


export const getDasboardCount = async (req, res) => {
    try {
        
      const userRequestCount = await User.count({
        where: {
          isVerified: true,
          isApproved: false,
        },
      });

      const activeUserCount = await User.count({
        where: {
          isVerified: true,
          isApproved: true,
        },
      });

    


      
      return res.status(200).json({ userRequestCount,activeUserCount });  
    } catch (error) {
      console.error('Error fetching active severity count:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

export const requestedUser = async (req, res) => {
try {
  const users = await User.findAll({
    where: {
      isVerified: true,
      isApproved: false,
    },
  });

  res.status(200).json(users);
  
} catch (error) {
  console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
 }

export const approveUser = async (req, res) => {
  try {
    console.log('controller');
    
  } catch (error) {
    
  }
}
