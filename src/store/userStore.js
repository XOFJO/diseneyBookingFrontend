import { create } from 'zustand';
import { getUserInfo, changeUserPassword, getUserFootprints, getUserAchievements } from '../services/api';

const useUserStore = create((set, get) => ({
    // User Info State
    userInfo: {
        userId: 1,
        username: '',
        phone: '',
        email: '',
        memberSince: 'Jan 2024', // Keep this static as requested
    },
    userInfoLoading: false,
    userInfoError: null,

    // Change Password State
    changePasswordLoading: false,
    changePasswordError: null,
    changePasswordSuccess: false,

    // My Footprints State
    footprints: [],
    footprintsLoading: false,
    footprintsError: null,

    // My Achievements State
    achievements: [],
    achievementsLoading: false,
    achievementsError: null,    // User Info Actions
    fetchUserInfo: async (userId = 1) => {
        set({ userInfoLoading: true, userInfoError: null });
        try {
            const data = await getUserInfo(userId);
            set((state) => ({
                userInfo: {
                    ...state.userInfo,
                    username: data.username,
                    phone: data.phone,
                    email: data.email,
                },
                userInfoLoading: false,
            }));
        } catch (error) {
            set({
                userInfoError: error.response?.data?.message || error.message || 'Failed to fetch user info',
                userInfoLoading: false,
            });
        }
    },    // Change Password Actions
    changePassword: async (userId = 1, oldPassword, newPassword) => {
        set({
            changePasswordLoading: true,
            changePasswordError: null,
            changePasswordSuccess: false
        });
        try {
            await changeUserPassword(userId, oldPassword, newPassword);
            set({
                changePasswordLoading: false,
                changePasswordSuccess: true,
            });
        } catch (error) {
            set({
                changePasswordError: error.response?.data?.message || error.message || 'Failed to change password',
                changePasswordLoading: false,
            });
        }
    },    // My Footprints Actions
    fetchFootprints: async (userId = 1) => {
        set({ footprintsLoading: true, footprintsError: null });
        try {
            const data = await getUserFootprints(userId);
            set({
                footprints: data,
                footprintsLoading: false,
            });
        } catch (error) {
            set({
                footprintsError: error.response?.data?.message || error.message || 'Failed to fetch footprints',
                footprintsLoading: false,
            });
        }
    },    // My Achievements Actions
    fetchAchievements: async (userId = 1) => {
        set({ achievementsLoading: true, achievementsError: null });
        try {
            const data = await getUserAchievements(userId);
            set({
                achievements: data,
                achievementsLoading: false,
            });
        } catch (error) {
            set({
                achievementsError: error.response?.data?.message || error.message || 'Failed to fetch achievements',
                achievementsLoading: false,
            });
        }
    },

    // Reset Functions
    resetChangePasswordState: () => {
        set({
            changePasswordLoading: false,
            changePasswordError: null,
            changePasswordSuccess: false,
        });
    },

    resetUserStore: () => {
        set({
            userInfo: {
                userId: 1,
                username: '',
                phone: '',
                email: '',
                memberSince: 'Jan 2024',
            },
            userInfoLoading: false,
            userInfoError: null,
            changePasswordLoading: false,
            changePasswordError: null,
            changePasswordSuccess: false,
            footprints: [],
            footprintsLoading: false,
            footprintsError: null,
            achievements: [],
            achievementsLoading: false,
            achievementsError: null,
        });
    },
}));

export default useUserStore;
