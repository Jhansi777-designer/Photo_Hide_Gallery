#!C:/Strawberry/perl/bin/perl.exe
use strict;
use warnings;
use CGI;
use CGI::Carp qw(fatalsToBrowser);
use JSON;
use Fcntl qw(:flock);

my $q = CGI->new;
print $q->header('application/json');

my $user = $q->param('user');
my $pass = $q->param('pass');

my $file = 'users.json';
my %users;

if (-e $file) {
    open my $fh, '<', $file;
    flock($fh, LOCK_SH);
    local $/;
    %users = %{ decode_json(<$fh>) };
    close $fh;
}

if ($users{$user} && $users{$user}{password} eq $pass) {
    print encode_json({ status => 'success', message => 'Login successful!' });
} else {
    print encode_json({ status => 'error', message => 'Invalid credentials' });
}
