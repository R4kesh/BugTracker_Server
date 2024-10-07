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
    const userId = req.params.id;

    const updatedUser = await User.update(
      { isApproved: true }, 
      { where: { id: userId } } 
    );

    if (updatedUser[0] === 1) {
      res.status(200).json({ success: true, message: 'User approved successfully' });
    } else {
      res.status(404).json({ success: false, message: 'User not found or already approved' });
    }
  } catch (error) {
    console.error('Error approving user:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

export const listUsers = async (req, res) => {
  try {
    const users=await User.findAll({
      where:{
        isVerified: true,
      isApproved: true,
      
      }
    })
    res.status(200).json(users);
    
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Server error' });
    
  }
}

export const blockUnblockUser= async (req, res) => {
  try {
    const { id } = req.params;
    const { isBlocked } = req.body;

    const user = await User.findByPk(id); 
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.isBlocked = isBlocked; 
    await user.save(); 

    res.status(200).json({ success: true, message: 'User block status updated' });

    
  } catch (error) {
    console.error('Error updating block status:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

