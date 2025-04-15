// auth.js

// Initial client data with encrypted credentials
const initialClients = {
    "client_1744634685191": {
        encrypted: "LU+FyYzg2REJ5GFlkFsjFrQZFtXb5I+REvt6UQMfDctFlYkBBki1qEYn8ZVdzxdEV2FGwct1UxU26IVgRdSuKR8fptAGrEPeFEnXl0/Wxc1edzpDvXqeoYGUBdN0nJUWMQuEcPDtRa6HsnYwiQxm3bR0dPfB6fVWZ9WhCwHpCgP7Fvc4wJDsCqCxUE+IBe35OAkVq2BrtX++1LbUkg3xwRtjyztTOY/YnpvlZxtwOHOeAoNyjeM0/Z2Xmyk/Tken6pGrrivbYfc8AeuSaFlUYZem0IY="
    },
"client_1744635265995": {
    encrypted: "LUt4Y7WsgwLu+nNwyswHDMCWXitzR3+EGd0Tzw4sAU57eG+f01IkBe0hznEdeLSAFxjWCpyHlOtJTkJ3djbpuXjNILhsaovap35JV5fFd53ABebMOz0mYfMnzcaxxxF876pV2v9j6sU908r7uFvI6C0KxgGLea2Zkq1zgV97v8BjUl0i4B+pdCIQiBqEcrbDfHmIgqGqEIChLicYYvTJiKMURYLsEp38owfNKfNVav7PzUXPtxXvGtN+sxTJBAxNvOUrJqmjirm3eQx+nkeKNySQYODQEvw7Dv0="
}
};

// Load clients from localStorage or initialize with default data
let clients = JSON.parse(localStorage.getItem('psychometric_clients')) || {};

// Merge initialClients into clients if they don't exist
Object.keys(initialClients).forEach(clientId => {
    if (!clients[clientId]) {
        clients[clientId] = initialClients[clientId];
    }
});

// Save merged clients to localStorage
saveClients();

let currentClient = null;

// Save clients to localStorage
function saveClients() {
    console.log("Saving clients to localStorage:", clients);
    try {
        localStorage.setItem('psychometric_clients', JSON.stringify(clients));
    } catch (error) {
        console.error("Error saving clients to localStorage:", error.message);
    }
}

// Authenticate a user by decrypting client data and verifying credentials
async function authenticate(username, password, secretKey) {
    console.log("Authenticating user:", username, "with secret key:", secretKey);
    if (!secretKey) {
        console.log("Authentication failed: Secret key required.");
        return null;
    }

    try {
        // Derive a cryptographic key from the secret key
        console.log("Deriving key from secret...");
        const key = await deriveKey(secretKey);
        console.log("Key derived successfully.");

        // Iterate through each client to find a match
        let clientFound = false;
        for (const clientId in clients) {
            clientFound = true;
            const client = clients[clientId];
            if (!client.encrypted) {
                console.log(`Skipping client ${clientId}: No encrypted data.`);
                continue;
            }

            try {
                // Decrypt the client's encrypted data
                console.log(`Attempting to decrypt data for client ${clientId}...`);
                const decryptedData = await decryptData(client.encrypted, key);
                console.log(`Decryption successful for client ${clientId}.`);
                const clientData = JSON.parse(decryptedData);
                console.log(`Decrypted data for client ${clientId}:`, clientData);

                // Check if the credentials match the user's username and password
                if (clientData.username === username && clientData.password === password) {
                    currentClient = clientData;
                    console.log("User authenticated as user for client:", clientId);
                    return { role: "user", clientId };
                }

                // Check if the credentials match the admin's username and password
                if (clientData.adminUsername === username && clientData.adminPassword === password) {
                    currentClient = clientData;
                    console.log("User authenticated as admin for client:", clientId);
                    return { role: "admin", clientId };
                }
            } catch (decryptionError) {
                console.error(`Decryption failed for client ${clientId}:`, decryptionError.message);
            }
        }

        if (!clientFound) {
            console.log("No clients found to authenticate against.");
        } else {
            console.log("Authentication failed: Invalid credentials.");
        }
        return null;
    } catch (error) {
        console.error("Authentication error:", error.message);
        throw error; // Propagate the error to the caller
    }
}

// Derive a cryptographic key from the secret key using PBKDF2
async function deriveKey(secret) {
    try {
        const encoder = new TextEncoder();
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            encoder.encode(secret),
            { name: 'PBKDF2' },
            false,
            ['deriveBits', 'deriveKey']
        );
        return await crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: encoder.encode('psychometrica-salt'),
                iterations: 100000,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            true,
            ['encrypt', 'decrypt']
        );
    } catch (error) {
        console.error("Error deriving key:", error.message);
        throw error;
    }
}

// Decrypt the encrypted data using AES-GCM
async function decryptData(encryptedBase64, key) {
    try {
        console.log("Decrypting data with Base64 string:", encryptedBase64);
        const encryptedData = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0));
        console.log("Encrypted data length:", encryptedData.length);
        const iv = encryptedData.slice(0, 12); // First 12 bytes are the IV
        const data = encryptedData.slice(12); // Remaining bytes are the encrypted data
        console.log("IV length:", iv.length, "Data length:", data.length);
        const decrypted = await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv },
            key,
            data
        );
        const decoded = new TextDecoder().decode(decrypted);
        console.log("Decrypted data:", decoded);
        return decoded;
    } catch (error) {
        console.error("Decryption error:", error.message);
        throw new Error(`Decryption failed: ${error.message}`);
    }
}

// Get the currently authenticated client
function getCurrentClient() {
    console.log("Getting current client:", currentClient);
    return currentClient;
}

// Get the branding information for the current client
function getClientBranding() {
    console.log("Getting client branding:", currentClient ? currentClient.branding : null);
    return currentClient ? currentClient.branding : null;
}

// Get all clients
function getAllClients() {
    console.log("Getting all clients:", clients);
    return clients;
}

// Add a new client
function addClient(clientId, clientData) {
    console.log("Adding client with ID:", clientId, "Data:", clientData);
    if (clients[clientId]) {
        console.error("Client ID already exists:", clientId);
        throw new Error(`Client ID ${clientId} already exists.`);
    }
    clients[clientId] = clientData;
    saveClients();
    console.log("Client added successfully. Updated clients:", clients);
}

// Remove a client
function removeClient(clientId) {
    console.log("Removing client with ID:", clientId);
    if (!clients[clientId]) {
        console.error("Client ID does not exist:", clientId);
        throw new Error(`Client ID ${clientId} does not exist.`);
    }
    delete clients[clientId];
    saveClients();
    console.log("Client removed successfully. Updated clients:", clients);
}

// Expose functions to the global scope
window.authenticate = authenticate;
window.getCurrentClient = getCurrentClient;
window.getClientBranding = getClientBranding;
window.getAllClients = getAllClients;
window.addClient = addClient;
window.removeClient = removeClient;