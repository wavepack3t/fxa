FROM ubuntu:18.04

# Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive
# Set the default shell to bash rather than sh
ENV SHELL /bin/bash

# Configure apt and install packages
RUN apt-get update \
    && apt-get -y install --no-install-recommends apt-utils sudo 2>&1 \
    #
    # Verify git, process tools, lsb-release (common in install instructions for CLIs) installed
    && apt-get -y install git procps lsb-release software-properties-common \
    #
    # Install Docker CE CLI
    && apt-get install -y apt-transport-https ca-certificates curl gnupg-agent \
    && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add - \
    && add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
    && apt-get update \
    && apt-get -y install docker-ce \
    #   #
    # Java install for FxA
    && apt-get -y install openjdk-11-jre \
    #    #
    # FxA dependencies.
    && apt-get -y install build-essential git-core libgmp3-dev graphicsmagick python-virtualenv python-dev pkg-config libssl-dev \
    #
    # Clean up
    && apt-get autoremove -y \
    && apt-get clean -y
    # && rm -rf /var/lib/apt/lists/*

# Add a non-root user
ARG USERNAME=fxadev
RUN useradd -m $USERNAME
ENV HOME /home/$USERNAME

# Add the User to the docker group
RUN usermod -aG docker ${USERNAME}

# Add sudo support
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Switch back to dialog for any ad-hoc use of apt-get
ENV DEBIAN_FRONTEND=dialog

# Set the default user
USER $USERNAME


# nvm install
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash \
    && export NVM_DIR="$HOME/.nvm" \
    && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" \
    && nvm install 10 \
    && nvm alias default 10

# Rust install
# RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
