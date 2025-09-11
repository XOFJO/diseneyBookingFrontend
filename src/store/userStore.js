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
    achievementsError: null,

    // Request tracking to prevent duplicate calls
    _requestsInProgress: new Set(),

    // User Info Actions
    fetchUserInfo: async (userId = 1) => {
        const state = get();
        const requestKey = `userInfo-${userId}`;
        
        // Prevent duplicate requests
        if (state._requestsInProgress.has(requestKey) || state.userInfoLoading) {
            return;
        }

        set((state) => ({
            _requestsInProgress: new Set([...state._requestsInProgress, requestKey]),
            userInfoLoading: true,
            userInfoError: null
        }));

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
                _requestsInProgress: new Set([...state._requestsInProgress].filter(key => key !== requestKey))
            }));
        } catch (error) {
            set((state) => ({
                userInfoError: error.response?.data?.message || error.message || 'Failed to fetch user info',
                userInfoLoading: false,
                _requestsInProgress: new Set([...state._requestsInProgress].filter(key => key !== requestKey))
            }));
        }
    },// Change Password Actions
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
            let errorMessage = 'Failed to change password';

            // Handle specific backend error response
            if (error.response?.status === 400) {
                const responseData = error.response.data;
                if (responseData?.message === 'Password change failed' || responseData?.status === 400) {
                    errorMessage = 'Password change failed'; // This will trigger "Incorrect old password!" in UI
                } else {
                    errorMessage = responseData?.message || errorMessage;
                }
            } else {
                errorMessage = error.response?.data?.message || error.message || errorMessage;
            }

            set({
                changePasswordError: errorMessage,
                changePasswordLoading: false,
            });
        }
    },    // My Footprints Actions
    fetchFootprints: async (userId = 1) => {
        const state = get();
        const requestKey = `footprints-${userId}`;
        
        // Prevent duplicate requests
        if (state._requestsInProgress.has(requestKey) || state.footprintsLoading) {
            return;
        }

        set((state) => ({
            _requestsInProgress: new Set([...state._requestsInProgress, requestKey]),
            footprintsLoading: true,
            footprintsError: null
        }));

        try {
            const data = await getUserFootprints(userId);
            set((state) => ({
                footprints: data,
                footprintsLoading: false,
                _requestsInProgress: new Set([...state._requestsInProgress].filter(key => key !== requestKey))
            }));
        } catch (error) {
            set((state) => ({
                footprintsError: error.response?.data?.message || error.message || 'Failed to fetch footprints',
                footprintsLoading: false,
                _requestsInProgress: new Set([...state._requestsInProgress].filter(key => key !== requestKey))
            }));
        }
    },

    // My Achievements Actions
    fetchAchievements: async (userId = 1) => {
        const state = get();
        const requestKey = `achievements-${userId}`;
        
        // Prevent duplicate requests
        if (state._requestsInProgress.has(requestKey) || state.achievementsLoading) {
            return;
        }

        set((state) => ({
            _requestsInProgress: new Set([...state._requestsInProgress, requestKey]),
            achievementsLoading: true,
            achievementsError: null
        }));

        try {
            const data = await getUserAchievements(userId);
            set((state) => ({
                achievements: data,
                achievementsLoading: false,
                _requestsInProgress: new Set([...state._requestsInProgress].filter(key => key !== requestKey))
            }));
        } catch (error) {
            set((state) => ({
                achievementsError: error.response?.data?.message || error.message || 'Failed to fetch achievements',
                achievementsLoading: false,
                _requestsInProgress: new Set([...state._requestsInProgress].filter(key => key !== requestKey))
            }));
        }
    },

    // Reset Functions
    resetChangePasswordState: () => {
        set({
            changePasswordLoading: false,
            changePasswordError: null,
            changePasswordSuccess: false,
        });
    },    resetUserStore: () => {
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
            _requestsInProgress: new Set(),
        });
    },
}));

export default useUserStore;
