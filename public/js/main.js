

document.addEventListener('DOMContentLoaded', function () {

    // Mobile menu functionality
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const overlay = document.querySelector('.overlay');
    const drawerClose = document.querySelector('.drawer-close');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', function () {
            mobileDrawer.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (drawerClose) {
        drawerClose.addEventListener('click', function () {
            mobileDrawer.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (overlay) {
        overlay.addEventListener('click', function () {
            mobileDrawer.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Copy server IP functionality
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(button => {
        button.addEventListener('click', function () {
            const ipText = this.getAttribute('data-clipboard-text');
            navigator.clipboard.writeText(ipText).then(() => {
                // Show feedback
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.backgroundColor = '#47da5b';

                // Reset after a delay
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Offset for fixed header
                    behavior: 'smooth'
                });

                // Close mobile drawer if open
                if (mobileDrawer.classList.contains('open')) {
                    mobileDrawer.classList.remove('open');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // Node Selection Dialog Functionality
    const nodeDialog = document.getElementById('nodeDialog');
    const nodeDialogClose = document.getElementById('nodeDialogClose');
    const nodeGrid = document.getElementById('nodeGrid');
    const nodeDialogConfirm = document.getElementById('nodeDialogConfirm');

    // Track the selected plan
    let selectedPlan = null;

    // Get node data from the server-provided data or use fallback
    const getNodeData = function () {
        if (
          window.APP_CONFIG &&
          Array.isArray(window.APP_CONFIG.clientNodes) &&
          window.APP_CONFIG.clientNodes.length > 0
        ) {
          console.log('Using client nodes from APP_CONFIG');
          return window.APP_CONFIG.clientNodes;
        }
      
        console.warn('Using fallback node data');
        return [
            { 
                id: '404', 
                name: '404', 
                location: '404', 
                specs: '404', 
                flag: '404',
                url: '404' 
            }
        ];
    };
    

    // Make showNodeDialog globally available
    window.showNodeDialog = function (planName) {
        console.log('showNodeDialog called with plan:', planName);
        // Store the selected plan
        selectedPlan = planName || 'Unknown';

        // Update the dialog title to include the plan name if provided
        const dialogTitle = document.querySelector('.node-dialog-title');
        if (dialogTitle) {
            if (planName) {
                dialogTitle.textContent = `Select a Server Node for Your ${planName} Plan`;
            } else {
                dialogTitle.textContent = 'Select a Server Node';
            }
        }

        populateNodeGrid();

        if (nodeDialog) {
            nodeDialog.style.display = 'flex';
            setTimeout(() => {
                nodeDialog.classList.add('visible');
            }, 10);
            document.body.style.overflow = 'hidden';
            console.log('Dialog Opened');
        } else {
            console.error('Node dialog element not found!');
        }
    };

    // Function to create node cards
    function populateNodeGrid() {
        if (!nodeGrid) {
            console.error('Node grid element not found!');
            return;
        }

        nodeGrid.innerHTML = '';
        const nodes = getNodeData();

        nodes.forEach(node => {
            const nodeCard = document.createElement('div');
            nodeCard.className = 'node-card';
            nodeCard.dataset.nodeId = node.id;
            nodeCard.dataset.nodeUrl = node.url;

            nodeCard.innerHTML = `
                <div class="node-flag">${node.flag}</div>
                <h3>${node.name}</h3>
                <p class="node-location">${node.location}</p>
                <p class="node-specs">${node.specs}</p>
            `;

            nodeGrid.appendChild(nodeCard);

            nodeCard.addEventListener('click', function () {
                // Remove selected class from all nodes
                document.querySelectorAll('.node-card').forEach(card => {
                    card.classList.remove('selected');
                });
                // Add selected class to clicked node
                this.classList.add('selected');
                // Enable the confirm button
                if (nodeDialogConfirm) {
                    nodeDialogConfirm.removeAttribute('disabled');
                    nodeDialogConfirm.dataset.selectedUrl = this.dataset.nodeUrl;
                }
            });
        });
    }

    // Close node selection dialog
    function closeNodeDialog() {
        if (nodeDialog) {
            nodeDialog.classList.remove('visible');
            setTimeout(() => {
                nodeDialog.style.display = 'none';
            }, 300); // Match the transition time
            document.body.style.overflow = '';
        }
    }

    if (nodeDialogClose) {
        nodeDialogClose.addEventListener('click', closeNodeDialog);
    } else {
        console.error('Node dialog close button not found!');
    }

    // Close dialog when clicking outside the content
    if (nodeDialog) {
        nodeDialog.addEventListener('click', function (event) {
            // Check if the click was directly on the node-dialog (the overlay)
            // and not on any of its children
            if (event.target === this) {
                closeNodeDialog();
            }
        });
    }

    // Confirm button handler
    if (nodeDialogConfirm) {
        nodeDialogConfirm.addEventListener('click', function () {
            const selectedUrl = this.dataset.selectedUrl;
            if (selectedUrl) {
                // In a real application, you would also send the selected plan information
                // along with the selected node to the server
                window.location.href = selectedUrl + '?plan=' + encodeURIComponent(selectedPlan);
            }
        });
    } else {
        console.error('Node dialog confirm button not found!');
    }
}); 