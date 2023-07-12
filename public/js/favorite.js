const faves = document.getElementById('favorite-btn');

const updateFavoriteStatus = async function (itemId) {
    const response = await fetch(`../controllers/favoriteRoutes/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ favorite: true }), // Set the favorite property to true
    });

    if (response.ok) {
        console.log('Item favorite status updated');
        // Perform any necessary actions after updating the favorite status
    } else {
        console.log('Failed to update item favorite status');
    }
};

faves.addEventListener('click', function () {
    const itemId = 'your-item-id'; // Replace with the actual item ID, not sure what it is
    updateFavoriteStatus(itemId);
});
