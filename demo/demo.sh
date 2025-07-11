#!/bin/bash

# Midnight Dark Theme Demo - Shell/Bash
# Demonstrates shell syntax highlighting with functions, variables, and modern features

set -euo pipefail  # Exit on error, undefined vars, pipe failures

# Global variables
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly APP_NAME="Midnight Dark Demo"
readonly VERSION="1.0.0"
readonly LOG_FILE="/tmp/demo.log"

# Color codes for output
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly PURPLE='\033[0;35m'
readonly CYAN='\033[0;36m'
readonly NC='\033[0m' # No Color

# Configuration array
declare -A CONFIG=(
    ["debug"]="true"
    ["log_level"]="info"
    ["max_retries"]="3"
    ["timeout"]="30"
)

# User data array
declare -a USERS=()

# Logging function
log() {
    local level="$1"
    shift
    local message="$*"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    echo "[$timestamp] [$level] $message" | tee -a "$LOG_FILE"
}

# Error handling function
error_exit() {
    log "ERROR" "$1"
    echo -e "${RED}Error: $1${NC}" >&2
    exit 1
}

# Success message function
success() {
    log "INFO" "$1"
    echo -e "${GREEN}✓ $1${NC}"
}

# Warning message function
warning() {
    log "WARN" "$1"
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Info message function
info() {
    log "INFO" "$1"
    echo -e "${BLUE}ℹ $1${NC}"
}

# Validate email format
validate_email() {
    local email="$1"
    local regex="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
    
    if [[ $email =~ $regex ]]; then
        return 0
    else
        return 1
    fi
}

# Add user function
add_user() {
    local name="$1"
    local email="$2"
    local role="${3:-user}"
    
    # Validate input
    if [[ -z "$name" ]]; then
        error_exit "Name cannot be empty"
    fi
    
    if ! validate_email "$email"; then
        error_exit "Invalid email format: $email"
    fi
    
    # Create user entry
    local user_data="${name}|${email}|${role}|$(date '+%Y-%m-%d %H:%M:%S')"
    USERS+=("$user_data")
    
    success "User added: $name ($email) with role $role"
}

# List users by role
list_users_by_role() {
    local target_role="$1"
    local count=0
    
    info "Users with role '$target_role':"
    
    for user in "${USERS[@]}"; do
        IFS='|' read -r name email role created_at <<< "$user"
        
        if [[ "$role" == "$target_role" ]]; then
            echo -e "  ${CYAN}• $name${NC} ($email) - Created: $created_at"
            ((count++))
        fi
    done
    
    if [[ $count -eq 0 ]]; then
        warning "No users found with role '$target_role'"
    else
        success "Found $count users with role '$target_role'"
    fi
}

# Backup users to file
backup_users() {
    local backup_file="${1:-users_backup_$(date '+%Y%m%d_%H%M%S').txt}"
    
    if [[ ${#USERS[@]} -eq 0 ]]; then
        warning "No users to backup"
        return 1
    fi
    
    {
        echo "# User Backup - $(date)"
        echo "# Format: name|email|role|created_at"
        printf '%s\n' "${USERS[@]}"
    } > "$backup_file"
    
    success "Users backed up to: $backup_file"
}

# Load users from backup file
load_users() {
    local backup_file="$1"
    
    if [[ ! -f "$backup_file" ]]; then
        error_exit "Backup file not found: $backup_file"
    fi
    
    local loaded_count=0
    while IFS= read -r line; do
        # Skip comments and empty lines
        if [[ "$line" =~ ^#.*$ ]] || [[ -z "$line" ]]; then
            continue
        fi
        
        USERS+=("$line")
        ((loaded_count++))
    done < "$backup_file"
    
    success "Loaded $loaded_count users from backup"
}

# Display help
show_help() {
    cat << EOF
${PURPLE}$APP_NAME v$VERSION${NC}

${CYAN}Usage:${NC}
    $0 [COMMAND] [OPTIONS]

${CYAN}Commands:${NC}
    add <name> <email> [role]    Add a new user
    list <role>                  List users by role
    backup [file]                Backup users to file
    load <file>                  Load users from backup file
    help                         Show this help message

${CYAN}Examples:${NC}
    $0 add "John Doe" "john@example.com" "admin"
    $0 list "admin"
    $0 backup "my_users.txt"
    $0 load "my_users.txt"

EOF
}

# Main function
main() {
    info "Starting $APP_NAME v$VERSION"
    
    # Check if log file is writable
    if ! touch "$LOG_FILE" 2>/dev/null; then
        warning "Cannot write to log file: $LOG_FILE"
    fi
    
    # Parse command line arguments
    case "${1:-help}" in
        "add")
            if [[ $# -lt 3 ]]; then
                error_exit "Usage: $0 add <name> <email> [role]"
            fi
            add_user "$2" "$3" "${4:-user}"
            ;;
        "list")
            if [[ $# -lt 2 ]]; then
                error_exit "Usage: $0 list <role>"
            fi
            list_users_by_role "$2"
            ;;
        "backup")
            backup_users "${2:-}"
            ;;
        "load")
            if [[ $# -lt 2 ]]; then
                error_exit "Usage: $0 load <file>"
            fi
            load_users "$2"
            ;;
        "help"|"-h"|"--help")
            show_help
            ;;
        *)
            error_exit "Unknown command: $1. Use '$0 help' for usage information."
            ;;
    esac
}

# Run main function with all arguments
main "$@"